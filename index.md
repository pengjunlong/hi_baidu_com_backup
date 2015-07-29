---
layout: archive
permalink: /
title: "Just for Fun"
---

<div class="tiles">
{% for post in site.posts %}
    {% if post.category_index %}
      {% else %}
        {% include post-grid.html %}
    {% endif %}
{% endfor %}
</div><!-- /.tiles -->
