swellDef = {
    vipTiers: [{
        level: 'MINT',
        levelAmount: 'Free to Join',
        multiplier: '1X',
        discount: ['', '', '', '', ''],
        color: '#d6e8e1'
    }, {
        level: 'JADE',
        levelAmount: '$250 Lifetime Spend',
        multiplier: '1.5X',
        discount: ["<i class='fa fa-circle' aria-hidden='true'></i>", "<i class='fa fa-circle' aria-hidden='true'></i>", "<i class='fa fa-circle' aria-hidden='true'></i>", '', ''],
        color: '#b9c5c5'
    }, {
        level: 'SAGE',
        levelAmount: '$450 Lifetime Spend',
        multiplier: '2X',
        discount: ["<i class='fa fa-circle' aria-hidden='true'></i>", "<i class='fa fa-circle' aria-hidden='true'></i>", "<i class='fa fa-circle' aria-hidden='true'></i>", "<i class='fa fa-circle' aria-hidden='true'></i>", "<i class='fa fa-circle' aria-hidden='true'></i>"],
        color: '#c7bdb0'
    }],
    referralForms: {
        newUserForm: {
            inputType: "text",
            submitText: "Submit",
            labelText: "",
            placeholder: "Submit your email to get started",
            formType: "new"
        },
        existingUserForm: {
            inputType: "text",
            submitText: "Submit",
            labelText: "",
            placeholder: "Enter your friends' emails (separated by commas)",
            formType: "existing"
        },
        externalContent: {
            referralEmailExists: "Please enter your email",
            referralEmailExistsForm: {
                inputs: [{
                        type: "text"
                    },
                    {
                        name: "email"
                    },
                    {
                        placeholder: "your email"
                    }
                ]
            }
        }
    },
    referralShareLinks: [{
            class: "swell-share-referral-messenger",
            href: "javascript:void(0)",
            icon: "fa fa-commenting",
            text: "Facebook Messenger",
            img: ""
        },
        {
            class: "swell-share-referral-twitter",
            href: "javascript:void(0)",
            icon: "fa fa-twitter",
            text: "Tweet",
            img: ""
        },
        {
            class: "swell-share-referral-sms",
            href: "javascript:void(0)",
            icon: "fa fa-mobile",
            text: "SMS",
            img: ""
        }
    ]
}

var checkCustomerStatus = function(loggedIn){
    if (loggedIn === true){
        jQuery('.logged-in-view').show();
        jQuery('.logged-out-view').hide();
        console.log(`logged in status: ${loggedIn}`)
    } else {
        jQuery('.logged-in-view').hide();
        jQuery('.logged-out-view').show();
        console.log(`logged in status: ${loggedIn}`)
    }

}

const checkCustomerLoggedIn = function(){
    if (jQuery('.logged-in').length >= 1 && jQuery('.not-logged-in').length == 0){
        jQuery('.logged-in-view').show();
        jQuery('.logged-out-view').hide();
        console.log(`logged in status: logged in`)
    } else if (jQuery('.not-logged-in').length >= 1 && jQuery('.logged-in').length == 0) {
        jQuery('.logged-in-view').hide();
        jQuery('.logged-out-view').show();
        console.log(`logged in status: logged out`)
    }
}