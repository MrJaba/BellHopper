(function() {
  window.RemoteHelpers = {
    extractAttributes: function(el) {
      var attributes, dataAttrRegex;
      if (el.attributes == null) {
        el = el[0];
      }
      attributes = {};
      dataAttrRegex = /^data\-/;
      $.each(el.attributes, function() {
        var key;
        if (this.specified && this.name.match(dataAttrRegex)) {
          key = this.name.replace(dataAttrRegex, '');
          return attributes[key] = this.value;
        }
      });
      return attributes;
    },
    requireAttributes: function(attributes, required) {
      var i, len, requiredAttribute, results;
      results = [];
      for (i = 0, len = required.length; i < len; i++) {
        requiredAttribute = required[i];
        if (!attributes[requiredAttribute]) {
          throw new Error("data-action=\"" + attributes['action'] + "\" elements must specify a data-" + requiredAttribute + " attribute");
        } else {
          results.push(void 0);
        }
      }
      return results;
    },
    onDataAction: function(dataAction, eventName, handler) {
      return $(document).on("ready page:load", function() {
        return $('body').delegate("[data-action=\"" + dataAction + "\"]", eventName, handler);
      });
    },
    triggerChange: function(models) {
      $(document).trigger("change:" + models, [models]);
      return UpdateableViews.updateViewsForModels(models);
    },
    notifyUserOfError: function() {
      return alert("Sorry, something when wrong. Please try again, or reload the page");
    }
  };

}).call(this);
