<?php

/******************************************************************************
 *	
 *	PROJECT: Flynax Classifieds Software
 *	VERSION: 4.3.0
 *	LICENSE: FL615037127W - http://www.flynax.com/license-agreement.html
 *	PRODUCT: General Classifieds
 *	DOMAIN: workwanted.london
 *	FILE: SETTINGS.TPL.PHP
 *	
 *	The software is a commercial product delivered under single, non-exclusive,
 *	non-transferable license for one domain or IP address. Therefore distribution,
 *	sale or transfer of the file in whole or in part without permission of Flynax
 *	respective owners is considered to be illegal and breach of Flynax License End
 *	User Agreement.
 *	
 *	You are not allowed to remove this information from the file without permission
 *	of Flynax respective owners.
 *	
 *	Flynax Classifieds Software 2014 | All copyrights reserved.
 *	
 *	http://www.flynax.com/
 ******************************************************************************/

/* template settings */
$tpl_settings = array(
	'type' => 'responsive_42', // DO NOT CHANGE THIS SETTING
	'version' => 1.4,
	'name' => 'general_flatty',
	'inventory_menu' => false,
	'right_block' => false,
	'long_top_block' => true,
	'featured_price_tag' => true,
	'ffb_list' => false, //field bound boxes plugins list
	'fbb_custom_tpl' => true
);

if ( is_object($rlSmarty) ) {
	$rlSmarty -> assign_by_ref('tpl_settings', $tpl_settings);
}

class rlTemplate extends reefless {
	public function rlTemplate() {
		global $rlSmarty;
	}

	public function ajaxGetCategoryLevel( $category_id, $type = false, $tpl = false, $function = false, $postfix = false, $section_key = false ) {
		global $_response, $rlSmarty, $rlListingTypes, $account_info, $lang;

		$this -> loadClass('Categories');

		/* get category infor */
		$category_id = (int)$category_id;
		$category = $GLOBALS['rlCategories'] -> getCategory($category_id);
		$rlSmarty -> assign_by_ref('category', $category);

		/* get child categories */
		$categories = $GLOBALS['rlCategories'] -> getCatTree($category_id, $type);

		/* custom category for current user detecting */
		if ( $rlListingTypes -> types[$category['Type']]['Cat_custom_adding'] ) {
			$custom_cat_in = $this -> fetch(array('ID', 'Name'), array('Account_ID' => $account_info['ID'], 'Parent_ID' => $category_id), "AND `Status` <> 'trash' ORDER BY `Date`", null, 'tmp_categories');
			if ( !empty($custom_cat_in) ) {
				foreach ($custom_cat_in as $key => $value) {
					$categories[] = array(
						'ID' => $custom_cat_in[$key]['ID'],
						'name' => $custom_cat_in[$key]['Name'],
						'Tmp' => true
					);
				}
			}
		}

		if ( $categories || ($rlListingTypes -> types[$category['Type']]['Cat_custom_adding'] && $category['Add']) ) {
			$rlSmarty -> assign_by_ref('categories', $categories);

			$file = 'blocks' . RL_DS . 'category_level.tpl';
			$_response -> append("type_section_{$section_key}", 'innerHTML', $rlSmarty -> fetch($file, null, null, false));
			$_response -> script("treeLoadLevel('{$tpl}', '{$function}', '{$section_key}');");

			if ( $function ) {
				$_response -> call($function);
			}
		}

		return $_response;
	}

	public function ajaxAddTmpCategoryTpl($name = false, $parent_id = false) {
		global $_response, $lang, $pages, $page_info, $account_info, $config, $steps, $rlValid;

		$name = $rlValid -> xSql(trim(trim($name, '"'), "'"));
		$parent_id = (int)$parent_id;

		if ( empty($name) || !$parent_id ) {
			$_response -> script("$('#tree_area_{$parent_id}').next().find('input[type=button]').val('{$lang['add']}')");
			return $_response;
		}

		/* check category exist */
		$sql = "SELECT `T1`.`ID` FROM `". RL_DBPREFIX ."categories` AS `T1` ";
		$sql .= "LEFT JOIN `". RL_DBPREFIX ."lang_keys` AS `T2` ON CONCAT('categories+name+', `T1`.`Key`) = `T2`.`key` ";
		$sql .= "WHERE LCASE(`T2`.`Value`) = '". strtolower($name) ."' AND `Parent_ID` = '{$parent_id}' LIMIT 1";
		$cat_exist = $this -> getRow($sql);

		$tmp_cat_exist = $this -> getOne('ID', "LCASE(`Name`) = '". strtolower($name) ."'", 'tmp_categories');

		if ( !empty($cat_exist) || $tmp_cat_exist ) {
			$error_mess = str_replace('[category]', $name, $lang['tmp_category_exists']);
			$_response -> script( "printMessage('error', '{$error_mess}')" );
		}
		else {
			/* save temporary category */
			$insert = array(
				'Name' => $name,
				'Parent_ID' => $parent_id,
				'Account_ID' => $account_info['ID'] ? $account_info['ID'] : 0,
				'Date' => 'NOW()'
			);

			$this -> loadClass('Actions');

			if ( $GLOBALS['rlActions'] -> insertOne($insert, 'tmp_categories') ) {
				/* append new dom item to the tree */	
				$tmp_id = mysql_insert_id();
				$tmp_link = $GLOBALS['config']['mod_rewrite'] ? $page_info['Path'] . '/tmp-category/'. $steps['plan']['path'] .'.html?tmp_id='. $tmp_id : '?page=' . $page_info['Path'] .'&amp;step='. $steps['plan']['path'] .'&amp;tmp_id='. $tmp_id;
				$tmp_link = SEO_BASE . $tmp_link;
				$tmp_field = '<option value="'.$tmp_link.'">'.$name.'<\/option>';
				
				if ( !$account_info['ID'] ) {
					$_SESSION['add_listing']['tmp_category_id'] = $tmp_id;
				}

				$_response -> script("$('#tree_area_{$parent_id}').append('{$tmp_field}').find('option').attr('select', false)");
				$_response -> script("$('#tree_area_{$parent_id}').find('option:last').attr('selected', 'selected');");
				$_response -> script("$('a#next_step').attr('href', '{$tmp_link}').removeClass('disabled');");
				$_response -> script("$('#tree_area_{$parent_id}').focus().next().fadeOut(function(){ $(this).remove(); });");

				/* inform category owner */
				$this -> loadClass('Mail');
				$mail_tpl = $GLOBALS['rlMail'] -> getEmailTemplate( 'custom_category_added_user' );
				$mail_tpl['body'] = str_replace( array('{category_name}'), array($name), $mail_tpl['body'] );

				$GLOBALS['rlMail'] -> send( $mail_tpl, $account_info['Mail'] );

				/* inform administrator */
				$mail_tpl = $GLOBALS['rlMail'] -> getEmailTemplate( 'custom_category_added_admin' );
				$mail_tpl['body'] = str_replace( array('{category_name}'), array($name), $mail_tpl['body'] );

				$GLOBALS['rlMail'] -> send( $mail_tpl, $config['notifications_email'] );
			}
			else {
				$GLOBALS['rlDebug'] -> logger("Cannot add temporary category, rlActions -> insertOne function returns false");
			}
		}

		return $_response;
	}

	public function pagination( $aParams = false ) {
		global $page_info, $lang, $config, $rlMobile;
		
		$calc = $aParams['calc'];
		$total = is_array($aParams['total']) ? count($aParams['total']) : $aParams['total'];
		$per_page = $aParams['per_page'];
		$add_url = $aParams['url'];
		$var = $aParams['var'];
		$controller = $aParams['controller'];
		$method = $aParams['method'];
		$custom = $aParams['custom'];
		$full = $aParams['full'];

		if ( $controller ) {
			$page_info['Path'] = $controller;
		}
		
		$current = empty($aParams['current']) ? 1 : $aParams['current'] ;
		
		if ( $rlMobile -> isMobile ) {
			$base = rtrim(RL_MOBILE_URL, 'index.php');
			if ($config['lang'] != RL_LANG_CODE && $config['mod_rewrite']) {
				$base .= RL_LANG_CODE . '/';
			}
		}
		else {
			$base = rtrim(SEO_BASE, 'index.php');
		}
		
		// build url
		if ( $config['mod_rewrite'] ) {
			if ( empty($add_url) ) {
				if ( $custom ) {
					$first_url = $base . $custom;
					$tpl_url = $base . $custom . '/index[pg].html';
					$first_url = $full ? str_replace('[pg]', '1', $tpl_url) : $first_url;
				}
				else {
					$first_url = $base . $page_info['Path'] . '.html';
					$tpl_url = $base . $page_info['Path'] . '/index[pg].html';
				}
			}
			else {
				$first_url = $base . $page_info['Path'] . '/' . $add_url . '.html';
				$tpl_url = $base . $page_info['Path'] . '/' . $add_url . '/index[pg].html';
				$first_url = $full ? str_replace('[pg]', '1', $tpl_url) : $first_url;
			}
			
			if ( $method == 'get' ) {
				preg_match('/^([^\?]*)\?/', $_SERVER['REQUEST_URI'], $matches);
				if ( $matches[0] ) {
					$request_string = preg_replace('/^([^\?]*)\?/', '', $_SERVER['REQUEST_URI']);
					$first_url .= '?'. $request_string;
					$tpl_url .= '?'. $request_string;
				}
			}
		}
		else {
			$query_string = preg_replace('/(page\=[^\?\&]+)/', '', $_SERVER['QUERY_STRING']);
			$query_string = preg_replace('/(\&?\??pg\=[^\?\&]+)/', '', $query_string);
			
			//$first_url = $base . 'index.php?page=' . $page_info['Path'] . $query_string;
			$first_url = $tpl_url = $base . 'index.php?page=' . $page_info['Path'] . $query_string . '&amp;pg=1';
			$tpl_url = $tpl_url = $base . 'index.php?page=' . $page_info['Path'] . $query_string . '&amp;pg=[pg]';
			
			if ( $add_url ) {
				$first_url .= $var ? '&amp;' . $var . '=' . $add_url : '&amp;'. $add_url;
				$tpl_url .= $var ? '&amp;' . $var . '=' . $add_url : '&amp;'. $add_url;
			}
		}

		if ( $calc > $total ) {
			$pages = ceil($calc/$per_page);
			$content = '<ul class="pagination">';
			
			if ( $current != 1 ) {
				$previous = $current - 1;
				$prev_sign = '&lsaquo;';
				// previous page
				$content .= '<li class="navigator ls"><a title="'.$GLOBALS['lang']['previous_page'].'" class="button" href="';
				$content .= $current == 2 ? $first_url : str_replace('[pg]', $previous, $tpl_url);
				$content .= '">'. $prev_sign .'</a></li>';
			}
			
			$content .= '<li class="transit"><span>'. $lang['page'] .' </span><input maxlength="4" type="text" value="'. $current .'" /><input type="hidden" name="stats" value="'.$current.'|'.$pages.'" /><input type="hidden" name="pattern" value="'. $tpl_url .'" /><input type="hidden" name="first" value="'. $first_url .'" /><span> '. $lang['of'] .' '. $pages .'</span></li>';
		
			if ( $current != $pages ) {
				// next page
				$next_sign = '&rsaquo;';
				$content .= '<li class="navigator rs"><a title="'.$GLOBALS['lang']['next_page'].'" class="button" href="'.str_replace('[pg]', $current+1, $tpl_url).'">'.$next_sign.'</a></li>';
			}

			$content .= '</ul>';
		}
		
		return $content;

	}

	public function blocks() {
		global $page_info, $blocks, $rlCommon, $rlSmarty, $account_info, $search_results_url, $advanced_search_url, $rlValid;

		if ( in_array($page_info['Controller'], array('account_type', 'my_messages')) ) {
			$account_address = (int)$_GET['id'] ? (int)$_GET['id'] : $_GET['nvar_1'];
			$rlValid -> sql($account_address);
			$account_id = is_numeric($account_address) ? $account_address : $this -> getOne('ID', "`Own_address` = '{$account_address}'", 'accounts');
		}

		if ( $page_info['Controller'] != 'account_type' || ($account_id && $page_info['Controller'] == 'account_type') ) {
			unset($blocks['account_alphabetic_filter'], $blocks['account_search']);
			$recount = true;
		}

		if ( !in_array($page_info['Controller'], array('account_type', 'my_messages')) || (!$account_id && in_array($page_info['Controller'], array('account_type', 'my_messages'))) ) {
			unset($blocks['account_page_info'], $blocks['account_page_location']);
			$recount = true;
		}

		if ( $page_info['Controller'] != 'listing_type' || 
			($page_info['Controller'] == 'listing_type' && ($_GET['listing_id'] || $_GET['id'] || $_GET['nvar_1'] == $search_results_url || $_GET['nvar_1'] == $advanced_search_url)) ) {
			unset($blocks['listing_type_categories']);
			$recount = true;
		}

		if ( !$page_info['Controller'] == 'profile' || !defined('IS_LOGIN') ) {
			unset($blocks['my_profile_sidebar']);
			$recount = true;
		}
		else {
			$blocks['my_profile_sidebar']['name'] = $account_info['Full_name'];
		}

		if ( $recount ) {
			$rlCommon -> defineBlocksExist($blocks);
		}

		if ( $page_info['Controller'] == 'registration' ) {
			$rlSmarty -> assign('no_h1', true);
		}
	}
}

$rlTemplate = new rlTemplate();

if ( !$config[$tpl_settings['type']] ) {
	/* insert indicate config */
	$sql = "INSERT INTO `". RL_DBPREFIX ."config` (`Group_ID`, `Position`, `Key`, `Default`, `Values`, `Type`, `Data_type`, `Plugin`) VALUES ";
	$sql .= "(0, '0', '{$tpl_settings['type']}', '1', '', 'text', '', '{$tpl_settings['type']}'),";
	$sql .= "(1, 40, 'responsive_42_fb', 'http://www.facebook.com/flynaxsoftware', '', 'text', 'varchar', '{$tpl_settings['type']}'),";
	$sql .= "(1, 41, 'responsive_42_twitter', 'http://twitter.com/Flynax', '', 'text', 'varchar', '{$tpl_settings['type']}');";
	$rlDb -> query($sql);
	
	$rlDb -> setTable('pages');
	$rlDb -> outputRowsMap = array('ID', 'ID');
	$lt_page_ids = $rlDb -> fetch(array('ID'), array('Controller' => 'listing_type'));

	$rlDb -> outputRowsMap = array('ID', 'ID');
	$at_page_ids = $rlDb -> fetch(array('ID'), array('Controller' => 'account_type'));
	$rlDb -> resetTable();
	
	/* add new boxes */
	$sql = "INSERT INTO `". RL_DBPREFIX ."blocks` (`Page_ID`, `Sticky`, `Cat_sticky`, `Key`, `Position`, `Side`, `Type`, `Content`, `Tpl`, `Status`, `Plugin`, `Readonly`) VALUES ";
	$sql .= "('". implode(',', $lt_page_ids) ."', '0', '1', 'listing_type_categories', 0, 'left', 'smarty', '{include file=''blocks''|cat:\$smarty.const.RL_DS|cat:''categories.tpl''}', '1', 'active', '{$tpl_settings['type']}', '1'),";
	$sql .= "('". implode(',', $at_page_ids) ."', '0', '0', 'account_alphabetic_filter', 1, 'left', 'smarty', '{include file=''blocks''|cat:\$smarty.const.RL_DS|cat:''account_alphabetic_filter.tpl''}', '1', 'active', '{$tpl_settings['type']}', '1'),";
	$sql .= "('". implode(',', $at_page_ids) ."', '0', '0', 'account_search', 2, 'left', 'smarty', '{include file=''blocks''|cat:\$smarty.const.RL_DS|cat:''account_search.tpl''}', '1', 'active', '{$tpl_settings['type']}', '1'),";
	$sql .= "('40,". implode(',', $at_page_ids) ."', '0', '0', 'account_page_info', 1, 'left', 'smarty', '{include file=''blocks''|cat:\$smarty.const.RL_DS|cat:''account_page_info.tpl''}', '1', 'active', '{$tpl_settings['type']}', '1'),";
	$sql .= "('40,". implode(',', $at_page_ids) ."', '0', '0', 'account_page_location', 2, 'left', 'smarty', '{include file=''blocks''|cat:\$smarty.const.RL_DS|cat:''account_page_location.tpl''}', '1', 'active', '{$tpl_settings['type']}', '1'),";
	$sql .= "('15', '0', '0', 'my_profile_sidebar', 1, 'left', 'smarty', '{include file=''blocks''|cat:\$smarty.const.RL_DS|cat:''my_profile_sidebar.tpl''}', '1', 'active', '{$tpl_settings['type']}', '1');";

	$rlDb -> query($sql);
	
	$languages = $rlLang -> getLanguagesList();
	$tpl_phrases = array(
		array('frontEnd', 'blocks+name+listing_type_categories', 'Categories'),
		array('frontEnd', 'lt_categories_box_failed', 'This box could be assigned to Listing Type pages only'),
		array('frontEnd', 'expand_map', 'Expand Map'),
		array('frontEnd', 'dealer_name_a_z', 'Dealer Name A-Z'),
		array('frontEnd', 'greater_listing_number', 'Number of ads (Descending)'),
		array('frontEnd', 'blocks+name+account_alphabetic_filter', 'Alphabetic Search'),
		array('frontEnd', 'blocks+name+account_search', 'Account Search'),
		array('frontEnd', 'blocks+name+account_page_info', 'Dealer Information'),
		array('frontEnd', 'blocks+name+account_page_location', 'Dealer Location'),
		array('frontEnd', 'blocks+name+my_profile_sidebar', 'My Profile Sidebar'),
		array('frontEnd', 'video_file', 'Video File'),
		array('common', 'header_banner', 'Header Banner'),
		array('admin', 'long_top', 'Long Top'),
		array('common', 'not_image_file', 'Please use image only'),
		array('common', 'renew_package', 'Renew Package'),
		array('common', 'save_search_text', 'Or [save this search] to get notifications about new ads meeting your criteria.'),
		array('common', 'no_account_location', 'Account location does not specified'),
		array('frontEnd', 'join_us_on_facebook', 'Join us on facebook'),
		array('frontEnd', 'join_us_on_twitter', 'Join us on twitter'),
		array('admin', 'config+name+responsive_42_fb', 'Your facebook account URL'),
		array('admin', 'config+name+responsive_42_twitter', 'Your twitter account URL'),
		array('frontEnd', 'nothing_found_for_char', 'Nothing found for <b>&quot;{char}&quot;</b>'),
	);

	/* insert template phrases */
	$sql = "INSERT IGNORE INTO `". RL_DBPREFIX ."lang_keys` (`Code`, `Module`, `Key`, `Value`, `Plugin`) VALUES ";
	foreach ($languages as $language) {
		foreach ($tpl_phrases as $tpl_phrase) {
			$sql .= "('{$language['Code']}', '{$tpl_phrase[0]}', '{$tpl_phrase[1]}', '{$tpl_phrase[2]}', '{$tpl_settings['type']}'), ";
		}
	}
	$sql = rtrim($sql, ', ');
	$rlDb -> query($sql);

	$db_prefix = RL_DBPREFIX;
	$sql = <<< VS
INSERT INTO `{$db_prefix}hooks` (`Name`, `Plugin`, `Code`, `Status`) VALUES
('listingDetailsBottom', '{$tpl_settings['type']}', 'global \$tpl_settings, \$tabs, \$lang, \$seller_info, \$rlAccount;\r\n if ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\n		unset(\$tabs[''seller''], \$tabs[''map''], \$tabs[''tell_friend''], \$tabs[''video'']);\r\n\r\n		\$fields = \$rlAccount -> getFormFields(\$seller_info[''Account_type_ID'']);\r\n		foreach ( \$fields as &\$field ) {\r\n			\$field[''value''] = \$GLOBALS[''rlCommon''] -> adaptValue(\$field, \$seller_info[\$field[''Key'']], ''account'', \$seller_info[''ID''] );\r\n		}\r\n\r\n		\$GLOBALS[''rlSmarty''] -> assign_by_ref(''account_short'', \$fields);', 'active'),
('boot', '{$tpl_settings['type']}', 'global \$rlTemplate, \$config, \$page_info, \$rlListings, \$rlSmarty, \$rlHook, \$listing_type, \$tpl_settings, \$category;\r\n\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\n\$rlSmarty -> unregister_function(''paging'');\r\n\$rlSmarty -> register_function(''paging'', array(''rlTemplate'', ''pagination''));\r\n\r\nif ( \$page_info[''Controller''] == ''listing_type'' && \$category && \$category[''ID''] == 0 ) {\r\n	if ( \$listing_type[''Cat_general_cat''] ) {\r\n		\$sorting_fields = \$rlListings -> getFormFields(\$listing_type[''Cat_general_cat''], ''short_forms'', \$listing_type[''Key'']);\r\n	\r\n		foreach (\$sorting_fields as \$key => \$value){\r\n			if ( \$sorting_fields[\$key][''Details_page''] ) {\r\n				\$sorting[\$sorting_fields[\$key][''Key'']] = \$sorting_fields[\$key];\r\n			}\r\n		}\r\n		unset(\$sorting_fields);\r\n		\$rlSmarty -> assign_by_ref(''sorting'', \$sorting);\r\n	}\r\n	\r\n	/* define sort field */\r\n	\$sort_by = \$_SESSION[''browse_sort_by''] = empty(\$_GET[''sort_by'']) ? \$_SESSION[''browse_sort_by''] : \$_GET[''sort_by''];\r\n	if ( !empty(\$sorting[\$sort_by]) ) {\r\n		\$order_field = \$sorting[\$sort_by][''Key''];\r\n	}\r\n	\$rlSmarty -> assign_by_ref(''sort_by'', \$sort_by);\r\n	\r\n	/* define sort type */\r\n	\$sort_type = empty(\$_GET[''sort_type'']) ? \$_SESSION[''browse_sort_type''] : \$_GET[''sort_type''] ;\r\n	\$_SESSION[''browse_sort_type''] = \$sort_type = in_array(\$sort_type, array(''asc'', ''desc'')) ? \$sort_type : false ;\r\n	\$rlSmarty -> assign_by_ref( ''sort_type'', \$sort_type );\r\n	\r\n	\$pInfo[''current''] = (int)\$_GET[''pg''];\r\n	\r\n	\$listings = \$rlListings -> getListings(''-1'', \$order_field, \$sort_type, \$pInfo[''current''], \$config[''listings_per_page''] );\r\n	\$rlSmarty -> assign_by_ref( ''listings'', \$listings );\r\n	\r\n	\$pInfo[''calc''] = \$rlListings -> calc;\r\n	\$rlSmarty -> assign_by_ref( ''pInfo'', \$pInfo );\r\n	\r\n	\$rlHook -> load(''browseMiddle'');\r\n}', 'active'),
('listingsModifyWhere', '{$tpl_settings['type']}', 'global \$tpl_settings, \$sql, \$listing_type, \$page_info, \$category;\r\n\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\nif ( \$page_info[''Controller''] != ''listing_type'' || !\$category ) return;\r\n \$sql = preg_replace("/(AND \\\\(`T1`\\\\.`Category_ID` = ''\\\\-1'' .* FIND_IN_SET\\\\(''\\\\-1'', `T3`\\\\.`Parent_IDs`\\\\) \\\\> 0 \\\\) )/", '''', \$sql, 1);\r\n			\$sql .= "AND `T3`.`Type` = ''{\$listing_type[''Key'']}'' ";', 'active'),
('searchMiddle', '{$tpl_settings['type']}', 'global \$tpl_settings, \$blocks, \$rlCommon, \$navIcons;\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\$navIcons = false;\r\n unset(\$blocks[''listing_type_categories'']);\r\n\$rlCommon -> defineBlocksExist(\$blocks);', 'active'),
('addListingBeforeSteps', '{$tpl_settings['type']}', 'global \$cur_step, \$steps, \$page_info, \$category, \$tpl_settings;\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\nif ( \$cur_step ) {\r\n	\$page_info[''name''] = \$steps[\$cur_step][''name''];\r\n}\r\n\$_SESSION[''add_listing''][''selected_categery''] = \$category[''ID''];\r\n\$_SESSION[''add_listing''][''selected_type''] = \$category[''Type''];', 'active'),
('accountsGetDealersByCharSqlWhere', '{$tpl_settings['type']}', 'global \$tpl_settings, \$rlSmarty, \$lang, \$config;\r\n\r\n\if ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\n\$sorting = \$rlSmarty -> get_template_vars(''sorting'');\r\nif ( !\$sorting ) {\r\n	\$sorting = array(\r\n		''date'' => array(\r\n			''name'' => \$lang[''join_date''],\r\n			''Key'' => ''alphabet'',\r\n			''default'' => true,\r\n			''Type'' => ''custom''\r\n		),\r\n		''alphabet'' => array(\r\n			''name'' => \$lang[''dealer_name_a_z''],\r\n			''Key'' => ''alphabet''\r\n		),\r\n		''Listings_count'' => array(\r\n			''name'' => \$lang[''greater_listing_number''],\r\n			''Key'' => ''Listings_count''\r\n		)\r\n	);\r\n\r\n	\$rlSmarty -> assign_by_ref(''sorting'', \$sorting);\r\n\r\n	/* define sort field */\r\n	\$sort_by = \$_SESSION[''alphabet_sort_by''] = \$_REQUEST[''sort_by''] ? \$_REQUEST[''sort_by''] : \$_SESSION[''alphabet_sort_by''];\r\n	if ( \$sorting[\$sort_by] ) {\r\n		\$rlSmarty -> assign_by_ref(''sort_by'', \$sort_by);\r\n	}\r\n	else {\r\n		unset(\$sort_by);\r\n	}\r\n	\r\n	/* define sort type */\r\n	\$sort_type = \$_SESSION[''alphabet_sort_type''] = \$_REQUEST[''sort_type''] ? \$_REQUEST[''sort_type''] : \$_SESSION[''alphabet_sort_type''];\r\n	\$sort_type = \$sort_type ? \$sort_type : ''desc'';\r\n	if ( in_array(\$sort_type, array(''asc'', ''desc'')) ) {\r\n		\$rlSmarty -> assign_by_ref(''sort_type'', \$sort_type);\r\n	}\r\n	else {\r\n		unset(\$sort_type);\r\n	}\r\n\r\n	if ( \$sort_by && \$sort_type ) {\r\n		\$param1 .= "ORDER BY ";\r\n		switch (\$sorting[\$sort_by][''Key'']) {\r\n			case ''alphabet'':\r\n				\$param1 .= \$config[''alphabetic_field''] ? "`T1`.`{\$config[''alphabetic_field'']}` " : "CONCAT(`T1`.`First_name`, `T1`.`Last_name`) ";\r\n				break;\r\n			\r\n			default:\r\n				\$param1 .= "`{\$sorting[\$sort_by][''Key'']}` ";\r\n				\$sort_type = ''desc'';\r\n				break;\r\n		}\r\n\r\n		\$param1 .= strtoupper(\$sort_type) .'' '';\r\n	}\r\n}', 'active'),
('specialBlock', '{$tpl_settings['type']}', 'global \$rlTemplate, \$tpl_settings;\r\n if ( \$tpl_settings[''type''] != ''responsive_42'' ) return; \$rlTemplate -> blocks();', 'active'),
('accountTypeAccount', '{$tpl_settings['type']}', 'global \$tpl_settings, \$blocks, \$account;\r\n\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\nif ( \$blocks[''account_page_info''] && \$account[''Full_name''] ) {\r\n	\$blocks[''account_page_info''][''name''] = \$account[''Full_name''];\r\n	\$blocks[''account_page_info''][''Tpl''] = 1;\r\n}\r\n\r\nif ( \$blocks[''account_page_location''] ) {\r\n	\$blocks[''account_page_location''][''Tpl''] = 1;\r\n}', 'active'),
('listingDetailsBottom', '{$tpl_settings['type']}', 'global \$tpl_settings, \$photos, \$videos, \$l_youtube_thumbnail, \$l_youtube_direct;\r\n\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' || defined(''RL_MOBILE'') ) return;\r\n\r\n foreach (\$videos as &\$video) {\r\n	if ( \$video[''Type''] == ''youtube'' ) {\r\n		\$video[''Thumbnail''] = str_replace(''{key}'', \$video[''Preview''], \$l_youtube_thumbnail);\r\n		\$video[''Photo''] = ''//www.youtube.com/watch?v=''.\$video[''Preview''];\r\n	}\r\n	else {\r\n		\$video[''Thumbnail''] = RL_FILES_URL . \$video[''Preview''];\r\n		\$video[''Photo''] = RL_FILES_URL . \$video[''Video''];	\r\n	}\r\n}\r\n\r\nforeach (\$photos as &\$photo) {\r\n	\$photo[''Photo''] = RL_FILES_URL . \$photo[''Photo''];\r\n	\$photo[''Thumbnail''] = RL_FILES_URL . \$photo[''Thumbnail''];\r\n}\r\n\r\n\$photos = array_merge(\$photos, \$videos);', 'active'),
('apPhpIndexBeforeController', '{$tpl_settings['type']}', 'global \$tpl_settings, \$l_block_sides, \$lang; if ( \$tpl_settings[''type''] == ''responsive_42'' ) { \$l_block_sides[''header_banner''] = \$lang[''header_banner'']; if ( \$tpl_settings[''long_top_block''] ) { \$l_block_sides[''long_top''] = \$lang[''long_top'']; } }', 'active'),
('pageinfoArea', '{$tpl_settings['type']}', 'global \$tpl_settings, \$l_block_sides, \$lang; if ( \$tpl_settings[''type''] == ''responsive_42'' ) { \$l_block_sides[''header_banner''] = \$lang[''header_banner'']; if ( \$tpl_settings[''long_top_block''] ) { \$l_block_sides[''long_top''] = \$lang[''long_top'']; } }', 'active'),
('addListingBottom', '{$tpl_settings['type']}', 'global \$rlTemplate, \$rlXajax, \$tpl_settings;\r\n\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\n\$rlXajax -> registerFunction(array(''getCategoryLevel'', \$rlTemplate, ''ajaxGetCategoryLevel'')); \$rlXajax -> registerFunction(array(''addTmpCategoryTpl'', \$rlTemplate, ''ajaxAddTmpCategoryTpl''));', 'active'),
('addListingTop', '{$tpl_settings['type']}', 'global \$rlCategories, \$get_step, \$steps, \$page_info, \$rlSmarty, \$tpl_settings;\r\n\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\n\$rlSmarty -> assign(''no_h1'', true);\r\n\r\nif ( !\$get_step ) {\r\n	\$page_info[''name''] = \$steps[''category''][''name''];\r\n}\r\n\r\nif ( \$_SESSION[''add_listing''][''selected_categery''] ) {\r\n	\$rlCategories -> parentPoints(array(\$_SESSION[''add_listing''][''selected_categery'']));\r\n}', 'active'),
('rlMessagesAjaxAfterMessageSent', '{$tpl_settings['type']}', 'global \$_response, \$tpl_settings;\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\n\$_response -> script("$(''#messages_cont'').mCustomScrollbar(''scrollTo'', ''bottom'');");', 'active'),
('messagesBottom', '{$tpl_settings['type']}', 'global \$rlAccount, \$rlSmarty, \$config, \$contact, \$tpl_settings;\r\n if ( \$tpl_settings[''type''] != ''responsive_42'' ) return; \r\n/* define fields for Google Map */\r\n\$location = \$rlAccount -> mapLocation;\r\n\r\nif ( \$config[''map_module''] && \$contact[''Loc_latitude''] && \$contact[''Loc_longitude''] ) {\r\n	\$location[''direct''] = \$contact[''Loc_latitude''] .'',''. \$contact[''Loc_longitude''];\r\n	\$rlSmarty -> assign_by_ref(''location'', \$location);\r\n}', 'active'),
('myPackagesSql', '{$tpl_settings['type']}', 'global \$sql, \$tpl_settings, \$page_info, \$lang;\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\$sql = str_replace(''`T2`.`Price`,'', ''`T2`.`Price`, `T2`.`Color`,'', \$sql);\r\n\r\nif ( \$_GET[''nvar_1''] == ''purchase'' || isset(\$_GET[''purchase'']) ) {\r\n\$page_info[''name''] = \$lang[''purchase_new_package''];\r\n}\r\n\r\nif ( \$_GET[''renew''] ) {\r\n\$page_info[''name''] = \$lang[''renew_package''];\r\n}', 'active'),
('tplHeader', '{$tpl_settings['type']}', 'global \$page_info, \$rlSmarty, \$lang, \$tpl_settings;\r\n\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\r\n \$advanced_saerch = \$rlSmarty -> get_template_vars(''advanced_search'');\r\nif (\$advanced_saerch) {\r\n \$page_info[''name''] = \$lang[''advanced_search''];\r\n}', 'active'),
('ajaxRecentlyAddedLoadPost', '{$tpl_settings['type']}', 'global \$_response, \$tpl_settings;\r\nif ( \$tpl_settings[''type''] != ''responsive_42'' ) return;\r\n\$_response -> script("\$(''#listings div.picture:not(.no-picture) > img'').hisrc();");', 'active');
VS;

	$rlDb -> query($sql);

	/* insert new block side */
	$reefless -> loadClass('Actions');
	@$rlActions -> enumAdd('blocks', 'Side', 'header_banner');
	@$rlActions -> enumAdd('blocks', 'Side', 'long_top');
}