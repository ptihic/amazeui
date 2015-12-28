$(function() {
  $(document).on('ready', render);
  $(window).on('resize', render);

  function render() {
    $('ul.status-progressbar').each(function() {
      var ul, li, data, name, value;

      ul = $(this).html('');
      data = JSON.parse(ul.attr('data-status-progressbar'));

      // Insert progresses
      for (name in data) {
        value = data[name];
        ul.append(
          '<li class="progress' + (value.status === '' ? '' : ' active') + '"><ul>' +
            '<li class="status">' + name + '</li>' +
            '<li class="' + (value.status === 'danger' ? 'cross am-icon am-icon-times' : 'circle') + '"></li>' +
            '<li class="date">' + (value.date === '' ? '&nbsp;<br/>&nbsp;' : value.date.replace(/ /, '<br/>')) + '</li>' +
          '</ul></li>'
        );
      }

      // Insert bars
      ul.children('li + li').before(
        '<li class="bar"><ul><li class="status">&nbsp;</li><li class="rectangle"></li><li class="date">&nbsp;<br/>&nbsp;</li></ul></li>'
      );

      // Activate bars
      ul.children('li.bar').filter(function() {
        li = $(this);
        if ($(this).prev().hasClass('active') && ($(this).next().hasClass('active'))) {
          li.addClass('active');
        }
      });
    });

    // Adjust bar width
    $('ul.status-progressbar').each(function() {
      var ul = $(this);
      var w = (ul.width() - ul.children('li.progress').length * 120) / ul.children('li.bar').length + 90 - 5;
      ul.children('li.bar').width(w);
      ul.find('li.rectangle').width(w);
    });
  }
});
