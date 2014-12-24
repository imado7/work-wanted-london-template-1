<!-- alphabetic account serach -->

{*php}
	$account_type = $this -> get_template_vars('account_type');
	if ( !$account_type ) {
		global $reefless;

		$account_type_key = 'at_dealer';// ALREADY COPPIED THIS CODE FOR NEW BOX? Just set necessary account type key in this var

		$reefless -> loadClass('Account');
		$account_type = $GLOBALS['rlAccount'] -> getTypeDetails($account_type_key);

		$this -> assign('account_type', $account_type);
	}
{/php*}

{assign var='at_page_key' value='at_'|cat:$account_type.Key}

{strip}
<div class="alphabetic-saerch">
	<div>
		{foreach from=$alphabet item='character' name='alphaF'}
			<a href="{$rlBase}{if $config.mod_rewrite}{$pages.$at_page_key}/{$character}.html{else}?page={$pages.$at_page_key}&amp;character={$character}{/if}" class="{if $character == $char}active{/if}{if $smarty.foreach.alphaF.iteration == 1 || $smarty.foreach.alphaF.iteration == 2} wide{/if}">{$character}</a>
		{/foreach}
	</div>
</div>
{/strip}

<!-- alphabetic account serach end -->