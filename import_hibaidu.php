<?php
function get_post($cururl)
{
    $content = file_get_contents($cururl);
    $content = preg_replace('/\R/u', '', $content);
    preg_match('/<div *class=content-other-info> *<span>(?P<time>[^<]*).*<h2 *class="title *content-title">(?P<title>[^<]*).*(?P<body><div *id=content *class="content *mod-cs-content *text-content *clearfix">.*<\/div>) *<div *class="mod-tagbox *clearfix"> *(?:<a *class="tag"[^>]*>#)*(?P<tag>[^<]*).*<div *class=detail-nav-pre> *<a href="(?P<preurl>[^"]*)/', $content, $matches);
    return $matches;
}

$cururl = 'http://hi.baidu.com/pengjunlong/item/a428613662f965fe96f88d43';
date_default_timezone_set('Asia/Hong_Kong');
while (!empty($cururl)) {
    $matches = get_post($cururl);
        var_dump($cururl);
    if (!empty($matches)) {
        $filename = date('Y-m-d-', strtotime($matches['time'])) . preg_replace('/[ \/]/', '-', $matches['title']) . '.html';
        $filename = '/Volumes/app/Users/pengjunlong/hi_baidu_com_backup/_posts/' . $filename;
        $body = '<h2>' . $matches['tag'] . "</h2><br/><h1>" . preg_replace('/[ \/]/', '-', $matches['title']) . "</h1><hr/>\n" . $matches['body'];
        file_put_contents($filename, $body, FILE_APPEND | LOCK_EX);
        $cururl = !empty($matches['preurl']) ? $matches['preurl'] : '';
    }
    sleep(1);
}
