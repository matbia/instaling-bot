// ==UserScript==
// @name         Insta.Ling bot
// @namespace    https://github.com/matbia/instaling-bot
// @version      1.0
// @description  Automate Insta.Ling sessions
// @author       matbia
// @match        https://instaling.pl/ling2/html_app/app.php?*
// @grant        none
// ==/UserScript==

/* Settings - Delay in milliseconds */
const autoAnswerDelay = 100;
const autoNextWordDelay = 1000;
const autoNewWordDelay = 1000;
const autoSkipDelay = 1000;
const autoFinishDelay = 1000;

//Menu
$('#learning_page').append(
    $('<div>').attr('id', 'botMenu').css({'border': '1px solid #212121', 'background-color': '#5FBD57', 'margin-top': '30px', 'padding': '2px'})
    .append(
        $('<input>').attr('type', 'checkbox').attr('name', 'autoAnswer')
    )
    .append(
        $('<span>').text('Auto answer').append($('<br>'))
    )
    .append(
        $('<input>').attr('type', 'checkbox').attr('name', 'autoCheck').prop('checked', true)
    )
    .append(
        $('<span>').text('Auto check').append($('<br>'))
    )
    .append(
        $('<input>').attr('type', 'checkbox').attr('name', 'autoNextWord').text('Auto next word').prop('checked', true)
    )
    .append(
        $('<span>').text('Auto next word').append($('<br>'))
    )
    .append(
        $('<input>').attr('type', 'checkbox').attr('name', 'autoNewWord').text('Auto new word').prop('checked', true)
    )
    .append(
        $('<span>').text('Auto new word').append($('<br>'))
    )
    .append(
        $('<input>').attr('type', 'checkbox').attr('name', 'autoSkipWord').text('Auto skip word').prop('checked', true)
    )
    .append(
        $('<span>').text('Auto skip word').append($('<br>'))
    )
    .append(
        $('<input>').attr('type', 'checkbox').attr('name', 'autoFinishWord').text('Auto finish').prop('checked', true)
    )
    .append(
        $('<span>').text('Auto finish')
    )
);

function getAnswer() {
    let src = $('#jp_audio_0').attr('src');
    return src.substring(src.lastIndexOf('/') + 1, src.length - 4);
}

function getRandomDelay() {
    return Math.floor(Math.random() * 512) * getAnswer().length + 2048;
}

//Auto Answer
window.setInterval(() => {
    if($('input[name="autoAnswer"]:checked').length > 0)
        $('#answer').val(getAnswer());
}, autoAnswerDelay);

//Auto Check
window.setInterval(() => {
    if($('input[name="autoCheck"]:checked').length > 0 && !$('#answer_result').is(':visible') && !$('#summary').is(':visible') && $('#answer').val())
        $('#check').click();
}, getRandomDelay());

//Auto Next Word
window.setInterval(() => {
    if($('input[name="autoNextWord"]:checked').length > 0 && $('#answer_result').is(':visible') && !$('#summary').is(':visible'))
        $('#nextword').click();
}, autoNextWordDelay);

//Auto New Word
window.setInterval(() => {
    if($('input[name="autoNewWord"]:checked').length > 0 && $('#new_word_form').is(':visible'))
        $('#dont_know_new').click();
}, autoNewWordDelay);

//Auto Skip
window.setInterval(() => {
    if($('input[name="autoSkip"]:checked').length > 0 && $('.possible_word_msg').is(':visible'))
        $('#skip').click();
}, autoSkipDelay);

//Auto Finish
window.setInterval(() => {
    if($('input[name="autoFinish"]:checked').length > 0 && $('#summary').is(':visible'))
        $('#return_mainpage').click();
}, autoFinishDelay)
