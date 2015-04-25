# Usage

How to write code for a website like this?

## Source

All source files can be found in `source/`. This includes:

* `stylesheets/`
* `_includes/`
* `_layouts/`
* `_posts/`

If you add stuff to the `source/` directory that does not start with an underscore it will be copied to the `_deploy/` directory.

## Scripts

To create a new post, use the `Rakefile`, in particular:

    rake 'new_post[Shielding information in the brain]'
