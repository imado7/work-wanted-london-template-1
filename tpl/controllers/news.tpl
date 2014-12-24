<!-- news tpl -->

<div class="content-padding">
	{if empty($news)}
		{if !empty($all_news)}
			<ul class="news">
			{foreach from=$all_news item='news'}
				<li>
					<div>
						<div class="date">{$news.Date|date_format:$smarty.const.RL_DATE_FORMAT}</div>
						<a class="link-large" title="{$news.title}" href="{$rlBase}{if $config.mod_rewrite}{$pages.news}/{$news.Path}.html{else}?page={$pages.news}&amp;id={$news.ID}{/if}"><h4>{$news.title}</h4>
						{rlHook name='newsPostCaption'}</a>
					</div>
					
					<article>
						{$news.content|strip_tags:false|truncate:$config.news_page_content_length:"":false}{if $news.content|strlen > $config.news_page_content_length}...{/if}
						{rlHook name='newsPostContent'}
					</article>
				</li>
			{/foreach}
			</ul>
			
			<!-- paging block -->
			{paging calc=$pInfo.calc total=$all_news current=$pInfo.current per_page=$config.news_at_page}
			<!-- paging block end -->
			
		{else}
			<div class="text-notice">{$lang.no_news}</div>
		{/if}
	{else}
		<div class="date">{$news.Date|date_format:$smarty.const.RL_DATE_FORMAT}</div>

		{rlHook name='newsPostCaption'}

		<article class="news">
			{$news.content}
			{rlHook name='newsPostContent'}
		</article>
		
		<div class="ralign">
			<a title="{$lang.back_to_news}" href="{$rlBase}{if $config.mod_rewrite}{$pages.news}.html{else}?page={$pages.news}{/if}">{$lang.back_to_news}</a>
		</div>
	{/if}
	
	{rlHook name='newsBottomTpl'}
</div>

<!-- news tpl end -->