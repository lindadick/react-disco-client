#!/bin/bash

yarn build && scp -r public/assets pi@192.168.1.10:/var/www/html/disco/.
