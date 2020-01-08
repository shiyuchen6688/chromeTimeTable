<?php
function escape($string) {
    return htmlentities(trim($string));
}