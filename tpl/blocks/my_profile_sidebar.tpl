<!-- my profile sidebar box -->

<form class="my-profile-sidebar" method="post" action="{$rlTplBase}request.ajax.php?mode=thumbnail&item=1" enctype="multipart/form-data">
	<div class="picture">
		<input id="thumbnail_input" type="file" name="thumbnail" />
	</div>

	<div class="info">
		<table class="info">
		<tr>
			<td class="name">{$lang.username}</td>
			<td class="value">{$profile_info.Username}</td>
		</tr>
		<tr>
			<td class="name">{$lang.account_type}</td>
			<td class="value">{$profile_info.Type_name}</td>
		</tr>
		{if $profile_info.Type_description}
		<tr>
			<td colspan="2" class="field" style="padding-top: 10px;">{$profile_info.Type_description}</td>
		</tr>
		{/if}
		</table>
	</div>
</form>

<!-- my profile sidebar box end -->