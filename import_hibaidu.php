<?php
function get_post($cururl)
{
    $content = file_get_contents($cururl);
    $content = preg_replace('/\R/u', '', $content);
    preg_match('/<div *class=content-other-info> *<span>(?P<time>[^<]*).*<h2 *class="title *content-title">(?P<title>[^<]*).*(?P<body><div *id=content *class="content *mod-cs-content *text-content *clearfix">.*<\/div>) *<div *class="mod-tagbox *clearfix"> *(?:<a *class="tag"[^>]*>#)*(?P<tag>[^<]*).*<div *class=detail-nav-pre> *<a href="(?P<preurl>[^"]*)/', $content, $matches);
    return $matches;
}

$cururl = 'http://hi.baidu.com/pengjunlong/item/81234648285331d3c1a5923f';
date_default_timezone_set('Asia/Hong_Kong');
while (!empty($cururl)) {
    $matches = get_post($cururl);
    if (!empty($matches)) {
        $filename = date('Y-m-d-', strtotime($matches['time'])) . preg_replace('/\//', '_', base64_encode($matches['title'])) . '.html';
        $filename = '/Volumes/app/Users/pengjunlong/bak/_posts/' . $filename;
        $body = sprintf("---\nlayout: post\ntitle: %s\ntime: %s\nkeywords: %s\n---\n%s", $matches['title'], $matches['time'], $matches['tag'], $matches['body']);
        file_put_contents($filename, $body, FILE_APPEND | LOCK_EX);
        $cururl = !empty($matches['preurl']) ? $matches['preurl'] : '';
    } else {
        echo $cururl, "\n";
    }
    sleep(1);
}
