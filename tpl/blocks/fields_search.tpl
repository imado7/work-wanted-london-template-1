{strip}
<!-- fields block ( for search ) -->

{foreach from=$fields item='field'}
<div class="submit-cell">
	{assign var='fKey' value=$field.Key}
	{assign var='fVal' value=$smarty.request.f}

	{assign var='cell_class' value='single-field'}
	{if $field.Type == 'price' || $field.Type == 'mixed'}
		{assign var='cell_class' value='three-field'}
	{elseif $field.Type == 'number'}
		{assign var='cell_class' value='two-fields'}
	{elseif $field.Condition == 'years'}
		{assign var='cell_class' value='two-fields'}
	{elseif $field.Type == 'checkbox' || $field.Type == 'radio'}
		{assign var='cell_class' value='checkbox-field'}
	{elseif $field.Type == 'bool'}
		{assign var='cell_class' value='couple-field'}
	{elseif $field.Key == 'Category_ID' && $listing_types[$group.Listing_type].Search_multi_categories}
		{assign var="levels_number" value=$listing_types[$group.Listing_type].Search_multicat_levels}
		{if $levels_number == 2}
			{assign var='cell_class' value='two-fields'}
		{elseif $levels_number > 2}
			{assign var='cell_class' value='three-field'}
		{/if}
	{/if}
	
	<div class="name">{$lang[$field.pName]}</div>
	<div class="field search-item {$cell_class}">

		{if $field.Type == 'text'}
			{if $field.Key|strpos:'zip' !== false && $aHooks.search_by_distance}
				<select style="width: 70px;" name="f[{$field.Key}][distance]">
					<option value="">{if $config.sbd_default_units == 'miles'}{$lang.sbd_mi_short}{else}{$lang.sbd_km_short}{/if}</option>
					{foreach from=','|explode:$config.sbd_distance_items item='distance'}
						<option {if $fVal.$fKey.distance == $distance}selected="selected"{/if} value="{$distance}">{$distance}</option>
					{/foreach}
				</select>
				<span class="divider">{$lang.sbd_within}</span>
				<input style="width: auto;" placeholder="{$lang.sbd_zipcode}" {if $fVal.$fKey.zip}value="{$fVal.$fKey.zip}"{/if} class="numeric" type="text" name="f[{$field.Key}][zip]" size="{if $field.Values}{$field.Values}{else}10{/if}" maxlength="10" />
			{else}
				<input type="text" name="f[{$field.Key}]" maxlength="{if $field.Values != ''}{$field.Values}{else}255{/if}" {if $fVal.$fKey}value="{$fVal.$fKey}"{/if} />
				{if $field.Key == 'keyword_search'}
					<div class="keyword_search_opt">
						<div>
							{assign var='tmp' value=3}
							{section name='keyword_opts' loop=$tmp max=3}
								<label><input {if $fVal.keyword_search_type}{if $smarty.section.keyword_opts.iteration == $fVal.keyword_search_type}checked="checked"{/if}{else}{if $smarty.section.keyword_opts.iteration == 2}checked="checked"{/if}{/if} value="{$smarty.section.keyword_opts.iteration}" type="radio" name="f[keyword_search_type]" /> {assign var='ph' value='keyword_search_opt'|cat:$smarty.section.keyword_opts.iteration}{$lang.$ph}</label>
							{/section}
						</div>
					</div>
					<div><a id="refine_keyword_opt" class="dotted" href="javascript:void(0)">{$lang.advanced_options}</a></div>
					<script type="text/javascript">
					{literal}
					
					$(document).ready(function(){
						$('#refine_keyword_opt').click(function(){
							$(this).parent().prev().slideToggle();
						});
					});
					
					{/literal}
					</script>
				{/if}
			{/if}
		{elseif $field.Type == 'number'}
			{if $field.Key|strpos:'zip' !== false && $aHooks.search_by_distance}
				<select style="width: 70px;" name="f[{$field.Key}][distance]">
					<option value="">{if $config.sbd_default_units == 'miles'}{$lang.sbd_mi_short}{else}{$lang.sbd_km_short}{/if}</option>
					{foreach from=','|explode:$config.sbd_distance_items item='distance'}
						<option {if $fVal.$fKey.distance == $distance}selected="selected"{/if} value="{$distance}">{$distance}</option>
					{/foreach}
				</select>
				<span class="divider">{$lang.sbd_within}</span>
				<input style="width: auto;" placeholder="{$lang.sbd_zipcode}" {if $fVal.$fKey.zip}value="{$fVal.$fKey.zip}"{/if} class="numeric" type="text" name="f[{$field.Key}][zip]" size="{if $field.Values}{$field.Values}{else}10{/if}" maxlength="10" />
			{elseif $field.Key|strpos:'zip' != false && !$aHooks.search_by_distance}
				<input {if $fVal.$fKey.from}value="{$fVal.$fKey.from}"{/if} class="numeric" type="text" name="f[{$field.Key}][from]" size="{if $field.Values}{$field.Values|count_characters}{else}10{/if}" maxlength="{if $field.Values}{$field.Values|count_characters}{else}10{/if}" />
			{else}
				<input value="{if $fVal.$fKey.from}{$fVal.$fKey.from}{/if}" placeholder="{$lang.from}" class="numeric" type="text" name="f[{$field.Key}][from]" maxlength="{if $field.Values}{$field.Values}{else}18{/if}" />
				<input value="{if $fVal.$fKey.to}{$fVal.$fKey.to}{/if}" placeholder="{$lang.to}" class="numeric" type="text" name="f[{$field.Key}][to]" maxlength="{if $field.Values}{$field.Values}{else}18{/if}" />
			{/if}
		{elseif $field.Type == 'date'}
			{if $field.Default == 'multi'}
				<input class="date" type="text" id="date_{$field.Key}{if $postfix}_{$postfix}{/if}" name="f[{$field.Key}]" maxlength="10" value="{$fVal.$fKey}" />
				<div class="clear"></div>
				<script type="text/javascript">
				{literal}
				$(document).ready(function(){
					$('#date_{/literal}{$field.Key}{if $postfix}_{$postfix}{/if}{literal}').datepicker({showOn: 'both', buttonImage: '{/literal}{$rlTplBase}{literal}img/blank.gif', buttonImageOnly: true, dateFormat: 'yy-mm-dd'}).datepicker($.datepicker.regional['{/literal}{$smarty.const.RL_LANG_CODE}{literal}']);
				});
				{/literal}
				</script>
			{elseif $field.Default == 'single'}
				{$postfix}
				<input class="date" type="text" id="date_{$field.Key}_from{if $postfix}_{$postfix}{/if}" name="f[{$field.Key}][from]" maxlength="10" value="{$fVal.$fKey.from}" /><img alt="" src="{$rlTplBase}img/blank.gif" class="between" /><input class="date" type="text" id="date_{$field.Key}_to{if $postfix}_{$postfix}{/if}" name="f[{$field.Key}][to]" maxlength="10" value="{$fVal.$fKey.to}" />
				<script type="text/javascript">
				{literal}
				$(document).ready(function(){
					$('#date_{/literal}{$field.Key}_from{if $postfix}_{$postfix}{/if}{literal}').datepicker({showOn: 'both', buttonImage: '{/literal}{$rlTplBase}{literal}img/blank.gif', buttonImageOnly: true, dateFormat: 'yy-mm-dd'}).datepicker($.datepicker.regional['{/literal}{$smarty.const.RL_LANG_CODE}{literal}']);
					$('#date_{/literal}{$field.Key}_to{if $postfix}_{$postfix}{/if}{literal}').datepicker({showOn: 'both', buttonImage: '{/literal}{$rlTplBase}{literal}img/blank.gif', buttonImageOnly: true, dateFormat: 'yy-mm-dd'}).datepicker($.datepicker.regional['{/literal}{$smarty.const.RL_LANG_CODE}{literal}']);
				});
				{/literal}
				</script>
			{/if}
		{elseif $field.Type == 'mixed'}
			<input value="{if $fVal.$fKey.from}{$fVal.$fKey.from}{/if}" placeholder="{$lang.from}" class="numeric" type="text" name="f[{$field.Key}][from]" maxlength="15" />
			<input value="{if $fVal.$fKey.to}{$fVal.$fKey.to}{/if}" placeholder="{$lang.to}" class="numeric" type="text" name="f[{$field.Key}][to]" maxlength="15" />
			
			<select name="f[{$field.Key}][df]" class="w80">
				<option value="0">{$lang.unit}</option>
				{if !empty($field.Condition)}
					{assign var='df_source' value=$field.Condition|df}
				{else}
					{assign var='df_source' value=$field.Values}
				{/if}
				{foreach from=$df_source item='df_item'}
					<option value="{$df_item.Key}" {if $df_item.Key == $fVal.$fKey.df}selected="selected"{/if}>{$lang[$df_item.pName]}</option>
				{/foreach}
			</select>
		{elseif $field.Type == 'price'}
			<input {if $fVal.$fKey.from}value="{$fVal.$fKey.from}"{/if} placeholder="{$lang.from}" class="numeric" type="text" name="f[{$field.Key}][from]" maxlength="15" />
			<input {if $fVal.$fKey.to}value="{$fVal.$fKey.to}"{/if} placeholder="{$lang.to}" class="numeric" type="text" name="f[{$field.Key}][to]" maxlength="15" />
		
			<select title="{$lang.currency}" name="f[{$field.Key}][currency]">
				<option value="0">{$lang.any|replace:'-':''}</option>
				{foreach from='currency'|df item='currency_item'}
					<option value="{$currency_item.Key}" {if $currency_item.Key == $fVal.$fKey.currency}selected="selected"{/if}>{$lang[$currency_item.pName]}</option>
				{/foreach}
			</select>
		{elseif $field.Type == 'bool'}
			<span class="custom-input">
				<label>
					<input type="radio" value="1" name="f[{$field.Key}]" {if $fVal.$fKey == '1'}checked="checked"{/if} />
					{$lang.yes}
				</label>
			</span>
			<span class="custom-input">
				<label>
					<input type="radio" value="0" name="f[{$field.Key}]" {if $fVal.$fKey == '0'}checked="checked"{/if}/>
					{$lang.no}
				</label>
			</span>
		{elseif $field.Type == 'select'}
			{rlHook name='tplSearchFieldSelect'}
			{assign var="multicat_listing_type" value=$group.Listing_type}
			{if $field.Condition == 'years'}
				<select name="f[{$field.Key}][from]">
					<option value="0">{$lang.from}</option>
					{foreach from=$field.Values item='option' key='key'}
						{if $field.Condition}
							{assign var='key' value=$option.Key}
						{/if}
						<option {if $fVal.$fKey.from}{if $fVal.$fKey.from == $key}selected="selected"{/if}{/if} value="{if $field.Condition}{$option.Key}{else}{$key}{/if}">{$option.name}</option>
					{/foreach}
				</select>
				<select name="f[{$field.Key}][to]">
					<option value="0">{$lang.to}</option>
					{foreach from=$field.Values item='option' key='key'}
						{if $field.Condition}
							{assign var='key' value=$option.Key}
						{/if}
						<option {if $fVal.$fKey.to}{if $fVal.$fKey.to == $key}selected="selected"{/if}{/if} value="{if $field.Condition}{$option.Key}{else}{$key}{/if}">{$option.name}</option>
					{/foreach}
				</select>
			{elseif $field.Key == 'Category_ID' && $listing_types[$multicat_listing_type].Search_multi_categories}
				{assign var="levels_number" value=$listing_types[$multicat_listing_type].Search_multicat_levels}

				<input type="hidden" id="{$post_form_key}_{$field.Key}_{$multicat_listing_type}_value" name="f[Category_ID]" value="{$fVal.$fKey}"/>
				<select id="{$post_form_key}_{$field.Key}_{$multicat_listing_type}_level0" class="multicat">
					<option value="0">{$lang.any}</option>
					{foreach from=$field.Values item='option' key='key'}
						<option {if $fVal.$fKey == $option.ID}selected="selected"{/if} value="{$option.ID}">{$lang[$option.pName]}</option>
					{/foreach}
				</select>

				{section name=multicat start=1 loop=$levels_number step=1}
					<select id="{$post_form_key}_{$field.Key}_{$multicat_listing_type}_level{$smarty.section.multicat.index}" disabled="disabled" class="multicat{if $smarty.section.multicat.last} last{/if}">
						<option value="0">{$lang.any}</option>
					</select>
				{/section}
			{else}
				<select name="f[{$field.Key}]">
					<option value="0">{$lang.any}</option>
					{foreach from=$field.Values item='option' key='key'}
						{if $field.Condition}
							{assign var='key' value=$option.Key}
						{/if}
						<option {if $field.Key == 'Category_ID'}style="padding-{$text_dir}: {$option.margin}px;"{/if} {if $field.Key == 'Category_ID' && $option.Level == '0'}class="highlight_option"{/if} {if isset($fVal.$fKey) && $fVal.$fKey == $key}selected="selected"{/if} value="{if $field.Key == 'Category_ID'}{$option.ID}{else}{if $field.Condition}{$option.Key}{else}{$key}{/if}{/if}">{$lang[$option.pName]}</option>
					{/foreach}
				</select>
			{/if}
		{elseif $field.Type == 'checkbox'}
			{assign var='fDefault' value=$field.Default}
			<input type="hidden" name="f[{$field.Key}][0]" value="0" />

			{foreach from=$field.Values item='option' key='key' name='checkboxF'}
				{if $field.Condition}
					{assign var='key' value=$option.Key}
				{/if}
				
				<span class="custom-input">
					<label title="{$lang[$option.pName]}">
						<input type="checkbox" value="{$key}" name="f[{$field.Key}][{$key}]" />
						{$lang[$option.pName]}
					</label>
				</span>
			{/foreach}
		{elseif $field.Type == 'radio'}
			<input type="hidden" value="0" name="f[{$field.Key}]" />
			{foreach from=$field.Values item='option' key='key' name='radioF'}
				{if $field.Condition}
					{assign var='key' value=$option.Key}
				{/if}
				
				<span class="custom-input">
					<label title="{$lang[$option.pName]}">
						<input type="radio" value="{$key}" name="f[{$field.Key}]" {if $fVal.$fKey}{if $fVal.$fKey == $key}checked="checked"{/if}{/if} />
						{$lang[$option.pName]}
					</label>
				</span>
			{/foreach}
		{/if}

	</div>
</div>

{/foreach}

<!-- fields block ( for search ) end -->
{/strip}