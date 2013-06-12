jquery.formstyles.js
====================

Generates masks for form elements to facilitate consistent cross-browser
styling. Currently works with selects, and checkbox, radio and submit 
inputs.


Example use
-----------

    $(function() {
        $("select").selectstyles();
        $('input[type="checkbox"], input[type="radio"]').checkboxstyles();
        $('input[type="submit"]').buttonstyles();
    });


Example select styles
---------------------

    .select-mask {
        display: inline-block;
        border-bottom: 2px #000 solid;
        width: 230px;
    }
    .select-mask select {
        cursor: pointer;
    }
    .select-mask span {
        display: block;
        padding: 5px 0;
    }
    .select-mask span:after {
        content: '↓';
        float: right;
    }
