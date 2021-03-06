(function ($) {
  /*

  See https://github.com/gregplaysguitar/jquery-formstyles
  License: https://github.com/gregplaysguitar/jquery-formstyles/blob/master/LICENSE.md

  Example use:

      $("select").selectstyles();
      $('input[type="checkbox"], input[type="radio"]').checkboxstyles();
      $('input[type="submit"]').buttonstyles();

  TODO:

  ✔ Wrap selects in a mask
  ✔ Wrap checkbox/radio
  ✔ Wrap submit buttons
  ✔ select to 0.01 opacity and fill mask
  ✔ customisable callback to set text in mask on change
  - expose an api to update the content, maybe? or not needed?
  ✔ handle focused states
  - handle disabled states
  - ellipsis for text that's too long? Or do we rely on css

  */

  var COMMON_CSS = {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: '0',
    height: '100%',
    width: '100%',
    opacity: 0.01,
    background: 'none',
    zIndex: 1,
    border: 'none'
  };

  function createmask (el, classname) {
    var mask = el.parent(classname);
    if (!mask.length) {
      mask = $('<div>').addClass(classname);
      mask.insertBefore(el).append(el);
    }
    if (mask.css('position') === 'static') {
      mask.css({
        position: 'relative'
      });
    }
    handle_focus(el, mask);
    return mask;
  }

  function handle_focus (el, mask) {
    el.on('focus', function () {
      mask.addClass('focused');
    });
    el.on('blur', function () {
      mask.removeClass('focused');
    });
  }

  $.fn.selectstyles = function (options) {
    options = $.extend({
      display_val: function (val, select) {
        return val;
      },
      classname: 'select-mask'
    }, options);

    this.each(function () {
      var select = $(this);
      var mask = createmask(select, options.classname);
      var label = $('<span>');

      // mask.css('minWidth', select.width());
      mask.append(label);

      select.css(COMMON_CSS);

      function set_val () {
        var val = select.find('option:selected').text();
        label.text(options.display_val(val, select));
      }
      set_val();
      select.on('change', set_val);
      select.data('set_val', set_val);

    // needed to set the width in ie
    // select[0].style.minWidth = mask.outerWidth() + 'px';
    // select[0].style.minHeight = mask.outerHeight() + 'px';
    });

    return this;
  };

  $.fn.checkboxstyles = function (options) {
    this.each(function () {
      var input = $(this);
      var options = $.extend({
        classname: input.attr('type') + '-mask'
      }, options);
      var mask = createmask(input, options.classname);

      input.css(COMMON_CSS).css({
        width: mask.outerWidth(),
        height: mask.outerHeight()
      });

      function set_val () {
        if (input.is(':checked')) {
          mask.addClass('checked');
        } else {
          mask.removeClass('checked');
        }
      }
      set_val();
      input.on('change', set_val);
      input.data('set_val', set_val);
      if (input.attr('type') === 'radio') {
        // for radio inputs, we need to change state on change for any
        // of the related inputs
        $('input[name="' + input.attr('name') + '"]').on('change', set_val);
      }
    });

    return this;
  };

  $.fn.buttonstyles = function (options) {
    options = $.extend({
      classname: 'button-mask'
    }, options);

    this.each(function () {
      var input = $(this);
      var mask = createmask(input, options.classname);

      input.css(COMMON_CSS);
      mask.append(input.val());
    });

    return this;
  };

  $.fn.fileinputstyles = function (options) {
    options = $.extend({
      classname: 'fileinput-mask'
    }, options);

    this.each(function () {
      var input = $(this);
      var mask = createmask(input, options.classname);
      var title = input.attr('title') || 'Choose file';
      var text = $('<span>');

      function set_val () {
        var bits = input.val().split(/\/|\\/);
        var val = bits[bits.length - 1];
        text.text(title + (val ? ': ' + val : ''));
      }

      mask.append(text);
      set_val();
      input.css(COMMON_CSS);
      mask.append(input.val());

      input.on('change', set_val);
    });

    return this;
  };

})(window.jQuery);
