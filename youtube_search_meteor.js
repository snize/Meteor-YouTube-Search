if (Meteor.isClient) {
    Template.youtubeSearch.results = function () {
        return Session.get("responsYoutube") || [];
    }

    Template.youtubeSearch.helpers({
        foo: function () {
            return Session.get("responsYoutube") !== undefined;
        }
    });

    Template.youtubeSearch.events({
        'click input[type=button]': function (event, template) {
            var url = 'https://gdata.youtube.com/feeds/api/videos?'
                + [
                'q=' + encodeURIComponent(template.find("input").value),
                'alt=json',
                'max-results=10',
                'v=2',
                'callback=?'
            ].join('&');

            $.getJSON(url, function (data, status) {
                    Session.set("responsYoutube", data.feed.entry);
                }
            );
        },
        'input input[type=text]': function (event, template) {
            template.find("input[type=button]").disabled = false;
        }
    });
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        // code to run on server at startup
    });
}
