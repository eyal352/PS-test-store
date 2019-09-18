# PS-magento2-test-store

Swell Loyalty and Referral pages for Magento 2

Link to references doc [here] (https://docs.google.com/document/d/1x0gjuC7-YvJh4nnfZyUa_RtHJy6u56S1b1drCYLREOk/edit?usp=sharing)

NOTE: For media files (images/videos/icons/etc) navigate to /magento/pub/media/ and create a folder named swell_assets to place all image assets

## Initial Setup

Commands to run after installing the folder:
````
sudo php bin/magento setup:di:compile
sudo php bin/magento cache:clean
sudo php bin/magento cache:flush
sudo php bin/magento indexer:reindex
sudo a2enmod rewrite
sudo service apache2 restart
sudo php bin/magento setup:static-content:deploy
````

If the commands break Magento, the issue could be with file permissions. The following line should fix the issue:

````
sudo chmod -R 777 /var/www/html/magento2
sudo php bin/magento setup:upgrade
````

## If Swell does not load because there is an issue with the URL path:

    1.  Navigate to the Magento 2 parent directory
    */vendor/yotpo/magento2-module-yotpo-loyalty/view/frontend/templates/snippet.phtml*
    2. Add the following snippet:
```
   $(document).on("swell:initialized", function() {
        swellAPI.setPathPrefix('magento2');
    });
```

## Breaking Relative Path URL Fix

Find the config data for the URLs by running the following command:
`select * from core_config_data where path like '%base%url%';`

Change the base URL values back to their original value (in this case, blank) by running the following command:
`UPDATE core_config_data SET value = '' WHERE config_id = 38;`

Then Flush Magento's cache with the following command:
```
sudo php bin/magento cache:clean
sudo php bin/magento cache:flush
```

## After making any changes, run the following commands in order to refresh Magento's server-side cache:
```
    sudo php bin/magento cache:clean
    sudo php bin/magento cache:flush
```
## When using jQuery

Do not use the `$` symbol to call jQuery, as it is not declared in the global space (where your JavaScript classes will declared) as it will not work. The global jQuery object available in Magento 2 is `jQuery`, not `$`

# Developing on the client via SSH

The easiest method for developing the app on the client is to use [Visual Studio Code] (https://visualstudio.microsoft.com/) and download the [remote SSH application] (https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-ssh)

Once Visual Studo and the remote SSH application are installed, create a config file via the following:
1. in VSC press 'command + shift + p' to open the Command Pallete and type `connect to host` and select `REMOTE-SSH: Connect to Host` option
2. Select `Configure SSH Host'` from the dropdown, then select `/Users/yourUsername/.ssh/config` (please note that yourUserName will be the name your user on your computer)
3. Once in the config file, format it accordingly:
````
 Host SelectNameForServer ie. PS-Server
    User yourUserNameOnServer ie. root or ubuntu
    HostName IPAddressOfServer ie. 10.101.7.38
    IdentityFile locationAndNameOfSSHKeys ie. ~/ps-creds.txt
````

So the final example would look something like the following:
````
 Host PS-Server
    User root
    HostName 10.101.7.38
    IdentityFile ~/ps-creds.txt
````

For more info, see the documentation (here)[https://code.visualstudio.com/docs/remote/ssh]

Note: there must be an SSH keyfile saved somewhere on your computer and referred to by the IdentityFile parameter of the config file in order for SSH to work 