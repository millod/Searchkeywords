
$(document).ready(function () {
   
    $('#txtKeywordSearch').keydown(function (e) {
        if (e.keyCode == 13) e.preventDefault();
    });

    $('#txtKeywordSearch').keyup(function (e) {
        moreKeywords = 15;
        if ($.trim($('#txtKeywordSearch').val()).length > 1) {
            keywordWatcher();
            if (e.keyCode == 13)
            {
                e.preventDefault();
                $('#searchedKeywords .keywordItem').each(function () {
                    if ($(this).text() == $('#txtKeywordSearch').val())
                    {
                        $(this).click();
                        return false;
                    }
                });
            }
            return false;
        }
    });

    $('#btnKeywordSearch').click(function () {
        moreKeywords = 50;
        keywordWatcher();
    });
    $('#btnKeywordSearchAll').click(function () {
        moreKeywords = -1;
        keywordWatcher();
    });

    $('#selectedKeywords .keywordItem').click(function () {
        $(this).remove();
        setValueOfKeywords();
    });

    $("#btnNewKeySave").click(function () {
        var searchKey = $.trim($('#txtKeywordSearch').val());
        $.ajax({
            url: $('#keywordPlace').attr('addkeyurl'),
            data: "searchKey=" + searchKey,
            dataType: "html",
            cache: "false",
            context: document.body,
            type: "POST",
            success: function (result) {
                $('#searchedKeywords').html(result);
                $('#selectedKeywords .keywordItem').each(function () {
                    $('#searchedKeywords .keywordItem[keyID=' + $(this).attr('keyID') + ']').remove();
                });
                setClickForAddKeys();
            }
        });
    });
    setValueOfKeywords();
});

var moreKeywords = 15;
function keywordWatcher() {
        clearTimeout($.data(this, 'timerkeyword'));
        var wait = setTimeout(searchKeyword, 500);
        $(this).data('timerkeyword', wait);
}

function searchKeyword() {
    var searchKey = $.trim($('#txtKeywordSearch').val());
    if (searchKey.length > 1) {
        $.ajax({
            url: $('#keywordPlace').attr('searchkeyurl'),
            data: "searchKey=" + searchKey + "&Top=" + moreKeywords,
            dataType: "html",
            cache: "false",
            context: document.body,
            type: "POST",
            success: function (result) {
                $('#searchedKeywords').html(result);
                $('#selectedKeywords .keywordItem').each(function () {
                    $('#searchedKeywords .keywordItem[keyID=' + $(this).attr('keyID') + ']').hide();
                });
                setClickForAddKeys();
            }
        });
    }
}

function setClickForAddKeys() {
    $('.keywordItem').click(function () {
        if ($.trim($(this).parent().attr('id')) == 'searchedKeywords') {
            $('#selectedKeywords').append(this);
        }
        else {
            $(this).remove();
        }
        setValueOfKeywords();
    });
}
function setValueOfKeywords() {
    var keyVals = '';
    $('#selectedKeywords .keywordItem').each(function () {
        keyVals += $(this).attr('keyID') + ',';
    });
    $('#keywordIdsVal').val(keyVals);

}
