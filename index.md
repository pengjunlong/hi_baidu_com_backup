---
layout: archive
permalink: /
title: "LIFE WAS LIKE A BOX OF CHOCOLATES"
---

<div class="tiles">
{% for post in site.posts %}
    {% if post.category_index %}
      {% else %}
        {% include post-grid.html %}
    {% endif %}
{% endfor %}
</div><!-- /.tiles -->
