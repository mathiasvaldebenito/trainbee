# README
#### Development setup

To run app locally execute the following comands:

* `docker-compose build`
* `docker-compose run web rake db:setup`
* `docker-compose up`

Finally, set the global variable _LOCAL_ at _./app/javascript/packs/aplicattion.js_ to **true**.