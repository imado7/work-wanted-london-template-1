<!-- home page content tpl -->

{php}
	$blocks = $this -> get_template_vars('blocks');
	foreach ($blocks as $key => &$block) {
		if ( $block['Side'] == 'top' && strpos($block['Key'], 'ltfb_') === 0 ) {
			$content = $block['Content'];
			unset($blocks[$key]);
			break;
		}
	}
	if ( !$content ) {
		foreach ($blocks as $key => &$block) {
			if ( $block['Side'] == 'middle' && strpos($block['Key'], 'ltfb_') === 0 ) {
				$content = $block['Content'];
				unset($blocks[$key]);
				break;
			}
		}
	}
	if ( !$content ) {
		foreach ($blocks as $key => &$block) {
			if ( $block['Side'] == 'bottom' && strpos($block['Key'], 'ltfb_') === 0 ) {
				$content = $block['Content'];
				unset($blocks[$key]);
				break;
			}
		}
	}
	if ( !$content ) {
		$content = "{include file='blocks'|cat:\$smarty.const.RL_DS|cat:'featured.tpl' listings=\$featured_gallery type='listings' field='condition' value='2'}";
	}

	$GLOBALS['rlCommon'] -> defineBlocksExist($blocks);
	$this -> assign('blocks', $blocks);
	$this -> assign('gallary_content', $content);

	preg_match('/listings=\\$([^\\s]+)/', $content, $matches);
	$featured_listings = $this -> get_template_vars($matches[1]);
	if ( !$featured_listings ) {
		$array = array(
			'Main_photo' => RL_TPL_BASE .'img/no-thumb.jpg',
			'custom' => true,
			'listing_title' => 'Demo Gallery, please create feature listings'
		);
		$featured_listings = array_fill(0, 5, $array);
		$this -> assign_by_ref($matches[1], $featured_listings);
		$this -> assign('demo_gallery', true);
	}
{/php}

<section class="home-content clearfix">
	<div class="gallary">
		<div class="featured_gallery{if $demo_gallery} demo{/if}"><div class="preview"><a {if $config.featured_new_window}target="_blank"{/if} title="{$lang.view_details}" href="#"><div></div></a><div class="fg-title hide"></div><div class="fg-price hide"></div></div>
		{assign var='featured_gallery' value=true}
		{insert name="eval" content=$gallary_content}
		{assign var='featured_gallery' value=false}
		</div>
	</div>
	
	<div class="search-form">
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'side_bar_search.tpl'}
	</div>
</section>

<!-- home page content tpl end -->