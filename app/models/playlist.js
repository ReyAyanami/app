import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  youtubeId: DS.attr('string'),
  channelId: DS.attr('string'),
  channelTitle: DS.attr('string'),
  publishedAt: DS.attr('string'),
  thumbnail: DS.attr('string'),
});
