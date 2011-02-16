function TimelineSetter(timelineData) {
  this.items = timelineData;
  this.times = _(this.items).map(function(q){
    return q.timestamp;
  })
  this.max = _(this.times).max();
  this.min = _(this.times).min();
}

TimelineSetter.prototype.createNotches = function() {
  console.log("max: "+ this.max);
  console.log("min: "+ this.min);
  var that = this;
  _(this.items).each(function(item) {
    var timestamp = item.timestamp;
    var position = ((that.max - timestamp) / (that.max - that.min)) * 100;
    $(".timeline_notchbar").append(
      "<div class='timeline_notch notch_" + timestamp + "' data-timestamp='" + timestamp + "'>&nbsp;</div>"
    );
    $(".notch_" + timestamp).css("left",position + "%");
  });
}

TimelineSetter.prototype.template = function(timestamp) {
  var item,tmpl,html;
  item = _(this.items).select(function(q) {
    return q.timestamp === Number(timestamp);
  })[0];
  tmpl = _.template($("#card_tmpl").html());
  html = tmpl(item);
  return html; 
}

$(document).ready(function() {
  var page_timeline = new TimelineSetter(timelineData);
  page_timeline.createNotches();
  $(".timeline_notch").hover(function() {
    var timestamp = $(this).attr("data-timestamp");
    var html = page_timeline.template(timestamp)
    $("#timeline_card_container").html(html).attr("style",$(this).attr("style"))
  },function() {
  });
});