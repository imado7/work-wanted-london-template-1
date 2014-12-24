<!-- listing details -->

{if !$errors}

<aside class="right">
	<!-- seller info -->
	<section class="side_block stick seller-short">
		<div class="clearfix">
			{if !empty($seller_info.Photo)}
				<div class="picture">
					{if $seller_info.Own_page}<a target="_blank" title="{$lang.visit_owner_page}" href="{$seller_info.Personal_address}">{/if}
					<img {if !empty($seller_info.Photo)}class="photo"{/if} style="background-image: url('{$smarty.const.RL_FILES_URL}{$seller_info.Photo}');" alt="{$lang.seller_thumbnail}" src="{$rlTplBase}img/blank.gif" />
					{if $seller_info.Own_page}</a>{/if}
				</div>
			{/if}
			<ul class="seller-info">
				<li>
					{if $seller_info.Own_page}<a title="{$lang.visit_owner_page}" href="{$seller_info.Personal_address}">{/if}
					{$seller_info.Full_name}
					{if $seller_info.Own_page}</a>{/if}
				</li>
				{if $seller_info.Display_email}
					<li>{encodeEmail email=$seller_info.Mail}</li>
				{/if}

				{assign var='short_field_first' value=true}
				{foreach from=$account_short item='short_field'}
					{if !empty($short_field.value) && $short_field.Details_page}
						<li{if $short_field_first} class="bold"{/if}>{$short_field.value}</li>
						{assign var='short_field_first' value=false}
					{/if}
				{/foreach}
			</ul>

			{if $config.messages_module && ($isLogin || (!$isLogin && $config.messages_allow_free))}
				<a class="contact-seller" href="javascript:void(0)" title="{$lang.contact_owner}"></a>
			{/if}

			{rlHook name='listingDetailsSellerBox'}
		</div>

		<!-- contact owner form template -->
		<div class="hide" id="contact_owner_form">
			<div class="caption">{$lang.contact_owner}</div>
			
			<form class="light-inputs" name="contact_owner" onsubmit="flynax.contactOwnerSubmit($(this).find('input[type=submit]'), {$listing_data.ID});return false;" method="post" action="">
						{if $isLogin}
							<div class="submit-cell">
								<div class="value">
									<div>{$lang.message} <span class="red">*</span></div>
									<textarea id="contact_owner_message" rows="6" cols=""></textarea>
								</div>
							</div>
						{else}
							<div class="submit-cell">
								<div class="name">{$lang.name} <span class="red">*</span></div>
								<div class="field"><input maxlength="100" type="text" id="contact_name" value="{$account_info.First_name} {$account_info.Last_name}" /></div>
							</div>
							<div class="submit-cell">
								<div class="name">{$lang.mail} <span class="red">*</span></div>
								<div class="field"><input maxlength="200" type="text" id="contact_email" value="{$account_info.Mail}" /></div>
							</div>
							<div class="submit-cell">
								<div class="name">{$lang.contact_phone}</div>
								<div class="field"><input maxlength="30" type="text" id="contact_phone" /></div>
							</div>
							<div class="submit-cell">
								<div class="name">{$lang.message} <span class="red">*</span></div>
								<div>
									<textarea id="contact_owner_message" rows="7" cols=""></textarea>
								</div>
							</div>
							<div class="submit-cell">
								<div class="field">
									{include file='captcha.tpl' captcha_id='contact_code'}
								</div>
							</div>
						{/if}
						<div class="submit-cell buttons">
							<div class="field">
								<input type="submit" name="finish" value="{$lang.send}" />
								<a class="red margin close" href="javascript:void(0)">{$lang.cancel}</a>
							</div>
						</div>
					</form>
		</div>
		<!-- contact owner form template end -->
	</section>
	<!-- seller info end -->

	<!-- map -->
	{if $config.map_module && $location}
		<script src="http://maps.googleapis.com/maps/api/js?libraries=places&amp;sensor=false{if $smarty.const.RL_LANG_CODE != '' && $smarty.const.RL_LANG_CODE != 'en'}&amp;language={$smarty.const.RL_LANG_CODE}{/if}"></script>
		<script>
		{literal}
		var map_data = {
			addresses: [['{/literal}{if $location.direct}{$location.direct}{else}{$location.search}{/if}', '{$location.show}', '{if $location.direct}direct{else}geocoder{/if}{literal}']],
			phrases: {
				hide: '{/literal}{$lang.hide}{literal}',
				show: '{/literal}{$lang.show}{literal}',
				notFound: '{/literal}{$lang.location_not_found}{literal}'
			},
			zoom: {/literal}{$config.map_default_zoom}{if $config.map_amenities && $amenities},{literal}
			localSearch: {
				caption: '{/literal}{$lang.local_amenity}{literal}',
				services: [{/literal}
					{foreach from=$amenities item='amenity' name='amenityF'}
					['{$amenity.Key}', '{$amenity.name}', {if $amenity.Default}'checked'{else}false{/if}]{if !$smarty.foreach.amenityF.last},{/if}
					{/foreach}
				{literal}]
			}
			{/literal}{/if}{literal}
		};
		{/literal}
		</script>

		<section title="{$lang.expand_map}" class="side_block stick map-capture">
			<img alt="{$lang.expand_map}" src="{$rlTplBase}img/blank.gif" fl:style="background-image: url('http://maps.googleapis.com/maps/api/staticmap?markers=color:blue|{if $location.direct}{$location.direct}{else}{$location.search}{/if}&zoom={$config.map_default_zoom}&size=480x180&sensor=false&scale=|ratio|{if $config.google_map_key}&key={$config.google_map_key}{/if}');" />
			<span class="media-enlarge"><span></span></span>
		</section>
	{/if}

	{strip}
	{foreach from=$blocks item='block'}
	{if $block.Side == 'left'}
		{include file='blocks'|cat:$smarty.const.RL_DS|cat:'blocks_manager.tpl' block=$block}
	{/if}
	{/foreach}
	{/strip}
</aside>

<div class="listing-details">

	{rlHook name='listingDetailsTopTpl'}

	<section class="main-section{if !$photos} no-picture{/if} clearfix">
		<script type="text/javascript">
		var fb_slideshow = {if $config.gallery_slideshow}{literal}{}{/literal}{else}false{/if};
		var fb_slideshow_delay = {if $config.gallery_slideshow_delay}{$config.gallery_slideshow_delay}*1000{else}5000{/if};
		</script>

		{if $listing_type.Photo}
		<div class="gallery">
			<div class="preview{if isset($photos.0.Video)} video{/if}">
				{if $photos}				
					<a rel="group" href="{$photos.0.Photo}" title="{if $photos.0.Description}{$photos.0.Description}{else}{$pageInfo.name}{/if}">
						<iframe width="" height="" src="{if isset($photos.0.Video) && $photos.0.Type == 'youtube'}//www.youtube.com/embed/{$photos.0.Preview}?rel=0{/if}" frameborder="0" allowfullscreen></iframe>
						<img src="{$rlTplBase}img/blank.gif" style="background-image: url('{$photos.0.Photo}')" />
						<span class="media-enlarge"><span></span></span>
					</a>
				{/if}
			</div>
			{if $photos|@count > 0}
				{math assign='slides' equation='ceil(count/(rows*cols))' cols=$config.pg_previewbox_cols rows=$config.pg_previewbox_rows count=$photos|@count}
				{assign var='per_slide' value=$config.pg_previewbox_cols*$config.pg_previewbox_rows}
				<div class="thumbs{if $photos|@count == 1} hide{/if}">
					<div title="{$lang.prev}" class="prev disabled"><div></div></div>
					<div title="{$lang.next}" class="next"><div></div></div>
					<div class="slider">
						<ul>
							{foreach from=$photos item='photoItem' name='photosF'}{strip}
							<li {if $smarty.foreach.photosF.first}class="active"{/if}>
								<a href="{$photoItem.Photo}" {if isset($photoItem.Video)}accesskey="{$photoItem.Preview}" target="_blank" class="video {$photoItem.Type}"{/if}><img title="{if $photoItem.Description}{$photoItem.Description}{else}{$pageInfo.name}{/if}" alt="{if $photoItem.Description}{$photoItem.Description}{else}{$pageInfo.name}{/if}" src="{$rlTplBase}img/blank.gif" style="background-image: url('{$photoItem.Thumbnail}');" />{if isset($photoItem.Video)}<span class="play"></span>{/if}</a>
							</li>
							{/strip}{/foreach}
						</ul>
					</div>
				</div>

				<div id="imgSource" class="hide">
				{foreach from=$photos item='photo'}
					<a rel="group" {if isset($photo.Video)}class="fancybox.iframe" href="//www.youtube.com/embed/{$photo.Preview}?autoplay=1"{else}href="{$photo.Photo}"{/if} title="{if $photo.Description}{$photo.Description}{else}{$pageInfo.name}{/if}"></a>
				{/foreach}
				</div>
			{/if}
		</div>
		{/if}

		<div class="details">
			<div class="top-navigation">
				<!-- price tag -->
				{foreach from=$listing item='group'}{foreach from=$group.Fields item='item' }
					{if !empty($item.value) && $item.Details_page && $item.Key == 'price'}
						<div class="price-tag" id="df_field_price">{$item.value}</div>
						{assign var='price_tag' value=true}
					{/if}
				{/foreach}{/foreach}
				<!-- price tag end -->
			</div>

			{assign var='is_shopping_cart' value=false}
			{if $aHooks.shoppingCart && ($listing_data.shc_mode == 'auction' || $listing_data.shc_mode == 'fixed')}
				{assign var='is_shopping_cart' value=true}
			{/if}

			{if $listing_type.Photo}
				<div class="content-padding{if !$is_shopping_cart} table-container{/if}">
					{assign var='main_section_break' value=false}
					{assign var='main_section_no_group' value=false}

					{if $is_shopping_cart}
						{include file=$smarty.const.RL_PLUGINS|cat:'shoppingCart'|cat:$smarty.const.RL_DS|cat:'listing_details_responsive_42.tpl'}
					{else}
						{foreach from=$listing item='group'}
							{if $group.Group_ID}
								{if !empty($group.Fields)}
									{if $main_section_no_group}
										{break}
									{/if}

									{foreach from=$group.Fields item='item' key='field' name='fListings'}
										{if !empty($item.value) && $item.Details_page && ($price_tag && $item.Key != 'price') || !$price_tag}
											{include file='blocks'|cat:$smarty.const.RL_DS|cat:'field_out.tpl'}
										{/if}
									{/foreach}

									{assign var='main_section_break' value=$group.Key}
								{/if}
							{else}
								{if $group.Fields}
									{foreach from=$group.Fields item='item'}
										{if !empty($item.value) && $item.Details_page && ($price_tag && $item.Key != 'price' || !$price_tag)}
											{include file='blocks'|cat:$smarty.const.RL_DS|cat:'field_out.tpl'}
										{/if}
									{/foreach}

									{assign var='main_section_no_group' value=true}
								{/if}
							{/if}

							{if $main_section_break}{break}{/if}
						{/foreach}

						{if $config.display_posted_date}<div class="table-cell"><div class="name"><div><span>{$lang.posted}</span></div></div><div class="value">{$listing_data.Date|date_format:$smarty.const.RL_DATE_FORMAT}</div></div>{/if}
					{/if}
				</div>
			{/if}

			<div class="plugins-inline">{rlHook name='listingDetailsBeforeStats'}</div>
		</div>
	</section>

	<section class="content-section clearfix">
		<!-- tabs -->
		<ul class="tabs">
			{foreach from=$tabs item='tab' name='tabF'}{strip}
				<li {if $smarty.foreach.tabF.first}class="active"{/if} id="tab_{$tab.key}">{$tab.name}</li>
			{/strip}{/foreach}
		</ul>
		<!-- tabs end -->

		<!-- tabs content -->

		<!-- listing details -->
		<div id="area_listing" class="tab_area">
			{rlHook name='listingDetailsPreFields'}

			<div class="content-padding">
			{foreach from=$listing item='group'}
				{if ($main_section_no_group && !$group.Key) || (!$main_section_no_group && $group.Key && $group.Key == $main_section_break)}{continue}{/if}

				{if $group.Group_ID}
					{assign var='hide' value=true}
					{if $group.Fields && $group.Display}
						{assign var='hide' value=false}
					{/if}
			
					{assign var='value_counter' value='0'}
					{foreach from=$group.Fields item='group_values' name='groupsF'}
						{if $group_values.value == '' || !$group_values.Details_page}
							{assign var='value_counter' value=$value_counter+1}
						{/if}
					{/foreach}
			
					{if !empty($group.Fields) && ($smarty.foreach.groupsF.total != $value_counter)}
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_header.tpl' id=$group.ID name=$group.name}
						
						{foreach from=$group.Fields item='item' key='field' name='fListings'}
							{if !empty($item.value) && $item.Details_page && ($price_tag && $item.Key != 'price') || !$price_tag}
								{include file='blocks'|cat:$smarty.const.RL_DS|cat:'field_out.tpl'}
							{/if}
						{/foreach}
						
						{include file='blocks'|cat:$smarty.const.RL_DS|cat:'fieldset_footer.tpl'}
					{/if}

					{assign var='main_section_no_group' value=false}
				{else}
					{if $group.Fields}
						{foreach from=$group.Fields item='item'}
							{if !empty($item.value) && $item.Details_page && ($price_tag && $item.Key != 'price' || !$price_tag)}
								{include file='blocks'|cat:$smarty.const.RL_DS|cat:'field_out.tpl'}
							{/if}
						{/foreach}
					{/if}
				{/if}
			{/foreach}
			</div>

			<!-- statistics area -->
			<section class="side_block statistics clearfix">
				<ul class="controls">
					<li>
						<!-- AddThis Button BEGIN -->
						<div class="addthis_toolbox addthis_default_style addthis_32x32_style">
						<a class="addthis_button_preferred_1"></a>
						<a class="addthis_button_preferred_2"></a>
						<a class="addthis_button_preferred_3"></a>
						<a class="addthis_button_preferred_4"></a>
						<a class="addthis_button_compact"></a>
						<a class="addthis_counter addthis_bubble_style"></a>
						</div>
						<script type="text/javascript" src="//s7.addthis.com/js/300/addthis_widget.js#pubid=xa-52d66a9b40223211"></script>
						<!-- AddThis Button END -->
					</li>
					{rlHook name='listingDetailsAfterStats'}
				</ul>
				<ul class="counters">
					{if $config.count_listing_visits}<li><span class="count">{$listing_data.Shows}</span> {$lang.shows}</li>{/if}
					{if $listing_data.comments_count}<li><a href="#comments"><span class="count">{$listing_data.comments_count}</span> {$lang.comment_tab}</a></li>{/if}
					{rlHook name='listingDetailsCounters'}
				</ul>
			</section>
			<!-- statistics area end -->
		</div>
		<!-- listing details end -->

		{rlHook name='listingDetailsBottomTpl'}

		<!-- tabs content end -->
		
	</section>
	
	<script type="text/javascript">
	{if isset($smarty.get.highlight)}
		flynaxTpl.highlightResults("{$smarty.session.keyword_search_data.keyword_search}", true);
	{/if}

	var ld_inactive = {if $pageInfo.Listing_details_inactive}'{$lang.ld_inactive_notice}'{else}false{/if};

	{literal}
	$(document).ready(function(){
		if ( ld_inactive ) {
			printMessage('warning', ld_inactive, false, true);
		}
		
		if ( $('#df_field_vin .value').length > 0 ) {
			var html = '<a style="font-size: 14px;" href="javascript:void(0);">{/literal}{if $lang.check_vin}{$lang.check_vin}{else}Check Vin{/if}{literal}</a>';
			var vin = $('#df_field_vin .value').html();
			var frame = '<iframe scrolling="auto" height="600" frameborder="0" width="100%" src="http://www.carfax.com/cfm/check_order.cfm?vin='+vin+'" style="border: 0pt none;overflow-x: hidden; overflow-y: auto;background: white;"></iframe>';
			
			$('#df_field_vin .value').append(html);
			
			$('#df_field_vin .value a').flModal({
				content: frame,
				width: 900,
				height: 640
			});
		}
	});
	{/literal}
	</script>
</div>
{else}
	<!-- TODO HERE -->
{/if}

<!-- listing details end -->