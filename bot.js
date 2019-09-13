// ==UserScript==
// @name         Insta.Ling bot
// @namespace    https://github.com/matbia/instaling-bot
// @version      1.0
// @description  Automate Insta.Ling sessions
// @author       matbia
// @match        https://instaling.pl/*
// @grant        none
// ==/UserScript==

/* Settings - Delay in milliseconds */
const autoAnswerDelay = 100;
const autoNextWordDelay = 1000;
const autoNewWordDelay = 1000;
const autoSkipDelay = 1000;
const autoFinishDelay = 1000;

//Bot menu HTML
$("#learning_page").append("<div id=\"botMenu\"><b>InstalingBot</b><br><input type=\"checkbox\" name=\"autoAnswer\" id=\"autoAnswer\">Auto Answer <br><input type=\"checkbox\" name=\"autoCheck\" id=\"autoCheck\" checked>Auto Check<br><input type=\"checkbox\" name=\"autoNextWord\" id=\"autoNextWord\" checked>Auto Next Word<br><input type=\"checkbox\" name=\"autoNewWord\" id=\"autoNewWord\" checked>Auto New Word<br><input type=\"checkbox\" name=\"autoSkip\" id=\"autoSkip\" checked>Auto Skip<br><input type=\"checkbox\" name=\"autoFinish\" id=\"autoFinish\" checked>Auto Stop<br></div>");

//Set CSS style for bot menu
$("#botMenu").css({"border-color": "#212121", "border-width": "1px", "border-style": "solid", "background-color": "#5FBD57", "margin-top": "30px"});

function getAnswer() {
    return decodeURIComponent($("#jp_audio_0").attr("src").split('/')[6].replace(".mp3", ""));
}

function getRandomDelay() {
    return Math.floor(Math.random() * (4000 - 2000)) + 725 * getAnswer().length;
}

//Auto Answer
window.setInterval(() => {
    if($('input[name="autoAnswer"]:checked').length > 0) {
        $("#answer").val(getAnswer());
    }
}, autoAnswerDelay);

//Auto Check
window.setInterval(() => {
    if($('input[name="autoCheck"]:checked').length > 0 && $("#answer_result").is(":visible") == false && $("#summary").is(":visible") == false && $("#answer").val() != "") {
        $("#check").click();
    }
}, getRandomDelay());

//Auto Next Word
window.setInterval(() => {
    if($('input[name="autoNextWord"]:checked').length > 0 && $("#answer_result").is(":visible") == true && $("#summary").is(":visible") == false) {
        $("#nextword").click();
    }
}, autoNextWordDelay);

//Auto New Word
window.setInterval(() => {
    if($('input[name="autoNewWord"]:checked').length > 0 && $("#new_word_form").is(":visible") == true) {
        $("#dont_know_new").click();
    }
}, autoNewWordDelay);

//Auto Skip
window.setInterval(() => {
    if($('input[name="autoSkip"]:checked').length > 0 && $(".possible_word_msg").is(":visible") == true) {
        $("#skip").click();
    }
}, autoSkipDelay);

//Auto Finish
window.setInterval(() => {
    if($('input[name="autoFinish"]:checked').length > 0 && $("#summary").is(":visible") == true) {
        $("#return_mainpage").click();
    }
}, autoFinishDelay)
