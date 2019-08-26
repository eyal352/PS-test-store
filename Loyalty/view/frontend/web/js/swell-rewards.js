// initializing 
(function() {
  $(document).on("swell:setup", function() {
    Swell.Referral.initializeReferral(".swell-referral", SwellConfig.Referral.opts);
    setupReferrals();

    Swell.Campaign.initializeCampaigns(".swell-campaign-list", SwellConfig.Campaign.opts);
    $(".swell-campaign:nth-child(3)").after("<li class='swell-campaign refer-friend'> <div class='swell-campaign-content'> <div class='swell-campaign-value'> <span class='swell-campaign-value-content'>Refer A Friend</span> </div> <div class='swell-campaign-type'> <span class='swell-campaign-type-content'>Refer a friend and get $5.</span> </div> <div class='swell-campaign-button'> <a href='#'' class='swell-campaign-button-content'>Start referring now</a> </div> </div> </li>");

    SwellConfig.Tier.initializeDummyTier();
    SwellConfig.Tier.initializeTiers();
    SwellConfig.Customer.initializeHistory(".swell-history-link");

    $(".swell-post-checkout-dailysale").show();
    $( 'body' ).on('click',".swell-post-checkout-dailysale .swell-post-checkout-heading .swell-referral-back-link", function() {
      $(".swell-post-checkout-dailysale").hide();
    });

    $(".swell-reward-dailysale-wrapper").show();

    if(spapi.authenticated) {
      $(".customer-logged-in").show();
      $(".customer-logged-out").hide();
    } else {
      $(".customer-logged-out").show();
      $(".customer-logged-in").hide();
    }

    $(".swell-spinner-loader").hide();

    $( document ).on('click',"#swell-referral-register-submit", function() {
      setTimeout(function(){
        if(spapi.customer.referral_receipts) {
          setupReferrals();
          if(spapi.customer.email) {
            $(".swell-referral-content-main").addClass("refer-step");
          }
        } else {
          setTimeout(function(){
            setupReferrals();
            if(spapi.customer.email) {
              $(".swell-referral-content-main").addClass("refer-step");
            }
          },1000)
        }
      },1000)
    });

    $(document).on("swell:referral:success", function() {
      swellAPI.refreshCustomerDetails(function(){
        var customerDetails = swellAPI.getCustomerDetails();
        referrals = customerDetails.referrals;

        $(".redeem-holder").show();

        $(".swell-referral-table tbody").html("");

        referrals.forEach(function(referral) {
          status = null;

          if(referral.completedAt){ 
            status = "Purchased(" + spapi.activeReferralCampaign.reward_text + " earned)";
          } else {
            status = "Invited";
          }

          $(".swell-referral-table tbody").append('<tr> <td>' +  referral.email + '</td><td>' + status +'</td></tr>');
        });
      });
    });

    $(document).on("swell:referral:error", function(jqXHR, textStatus, errorThrown) { 
      if(textStatus && textStatus === "EMAILS_ALREADY_PURCHASED"){
        $(".refer-customer-error").remove();
        $(".swell-referral-form-body").prepend('<p class="refer-customer-error">Sorry! Looks like this person has already made a purchase. Try referring another friend.</p>');
        $("#swell-referral-refer-emails").addClass("error-border");
      }
    });

    $(document).on("swell:referral:error", function(jqXHR, textStatus, errorThrown) { 
      if(textStatus && textStatus === "Please enter a valid email address"){
          $(".refer-customer-error").remove();
          $(".swell-referral-form-body").prepend('<p class="refer-customer-error">Please enter valid email addresses seperated with commas</p>');
          $("#swell-referral-refer-emails").addClass("error-border");
        }
    });
  });
}).call(this);

function setupReferrals (){
  if(spapi.customer.email) {
    if(spapi.customer.referral_receipts.length > 0) {
      $(".redeem-holder").show();

      referrals = spapi.customer.referral_receipts;

      referrals.forEach(function(referral) {
        status = null;

        if(referral.completed_at){ 
          status = "Purchased(" + spapi.activeReferralCampaign.reward_text + " earned)";
        } else {
          status = "Invited";
        }

        $(".swell-referral-table tbody").append('<tr> <td>' +  referral.email + '</td><td>' + status +'</td></tr>');
      });  
    }
  }
}

// campaigns
(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Campaign = {
    opts: {
      templates: {
        campaign: '<li class="swell-campaign">  <div    class="swell-campaign-content"    data-display-mode="modal"   data-campaign-id="<%= campaign.id %>">  <div class="swell-campaign-icon">      <span class="swell-campaign-icon-content"><i class="fa <%= campaign.icon %>"></i></span>    </div>    <div class="swell-campaign-value">      <span class="swell-campaign-value-content"><%= campaign.reward_text %></span>    </div>    <div class="swell-campaign-type">      <span class="swell-campaign-type-content"><%= campaign.title %></span>    </div>  </div></li>',
      }
    }
  };
}).call(this);

// referral
(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Referral = {
    opts: {
      localization: {
        referralSidebarDetailsAction: "Refer a Friend",
        referralSidebarDetailsReward: "<%= referralCampaign.reward_text %>",

        referralRegisterHeading: "Give <%= referralCampaign.reward_text %>, Get <%= referralCampaign.reward_text %>",
        referralRegisterFormDetails: "Please submit your email below to get started.",
        referralRegisterFormEmail: "your email address",
        referralRegisterFormSubmit: "Next",
        referralRegisterDetails: "<%= referralCampaign.details %>",

        referralReferHeading: "Give <%= referralCampaign.reward_text %>, Get <%= referralCampaign.reward_text %>",
        referralReferFormEmails: "your friends' emails (separated by Commas)",
        referralReferFormSubmit: "Send",
        referralReferFormDetails: "Now, enter your friends' emails below.",
        referralReferFormEmailsDetails: "",
        referralReferDetails: "<%= referralCampaign.details %>",

        referralReferMediaDetails: "You can also share your link with the buttons below",

        referralShareFacebook: "Share",
        referralShareTwitter: "Twitter",
        referralShareCopy: "Copy Link",
        referralShareMessenger: "Messenger",
        referralShareSMS: "SMS",

        referralFacebookIcon: "swell-icon-shape-1",
        referralTwitterIcon: "swell-icon-twitter",
        referralLinkIcon: "swell-icon-shape-3",
        referralMessengerIcon: "swell-icon-shape-4",
        referralSMSIcon: "swell-icon-forma-11",
        referralCopyButtonImage: "http://localhost:8888/magento/pub/media/swell-dailysale.jpg",

        referralThanksHeading: "Thanks for Referring!",
        referralThanksDetails: "Remind your friends to check their emails.",

        referralCopyHeading: "",
        referralCopyButton: "Copy Link",
        referralCopyDetails: "Copy and share link with your friends"
      },
      templates: {
        referralRefer: '<div class="swell-referral-refer"> <h2 class="swell-referral-heading"><%= localization.referralReferHeading %></h2> <p class="swell-referral-details"><%= localization.referralReferDetails %></p> <div class="swell-referral-form-wrapper"> <form class="swell-referral-form" name="swell-referral-refer-form" id="swell-referral-refer-form" method="POST" action="."> <div class="swell-referral-form-header"> <p class="swell-referral-form-header-details"><%= localization.referralReferFormDetails %></p> </div> <div class="swell-referral-form-body"> <ul class="swell-referral-form-list"> <li class="swell-referral-form-list-field"> <input class="swell-referral-form-list-field-input" type="text" name="swell-referral-refer-emails" id="swell-referral-refer-emails" required="required" placeholder="<%= localization.referralReferFormEmails %>"> <span class="swell-referral-form-field-details"><%= localization.referralReferFormEmailsDetails %></span> </li> </ul> </div> <div class="swell-referral-form-footer"> <input class="swell-referral-form-list-submit" type="submit" name="swell-referral-refer-submit" id="swell-referral-refer-submit" value="<%= localization.referralReferFormSubmit %>"> </div> </form> </div> <div class="swell-referral-media-wrapper"> <p class="swell-referral-media-details"><%= localization.referralReferMediaDetails %></p> <ul class="swell-referral-media-list"> <li class="swell-referral-medium swell-share-referral-facebook"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralFacebookIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareFacebook %> </div> </li> <li class="swell-referral-medium swell-share-referral-messenger"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralMessengerIcon %>" aria-hidden="true"> <span class="path1"></span> <span class="path2"></span> </i> <span><%= localization.referralShareMessenger %> </span> </div> </li> <li class="swell-referral-medium swell-share-referral-sms"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralSMSIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareSMS%> </div> </li> <li class="swell-referral-medium swell-share-referral-copy"> <div class="swell-referral-medium-content"> <i class="swell-referral-media-icon <%= localization.referralLinkIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralShareCopy %> </div> </li> </ul> </div> </div>',
        referralCopy: '<div class="swell-referral-copy"> <div class="swell-referral-copy-content"> <div class="swell-referral-copy-sidebar"></div> <div class="swell-referral-copy-main"> <span class="swell-referral-back-link"></span> <h2 class="swell-referral-heading"> <i class="swell-referral-heading-icon <%= localization.referralLinkIcon %>" aria-hidden="true"></i>&nbsp;<%= localization.referralCopyHeading %> </h2> <div class="swell-referral-form-wrapper"> <img class="logo-image" src="<%= localization.referralCopyButtonImage %>"> <div class="swell-referral-copy-link" id="swell-referral-copy-link"><%= customer.referralLink %></div> <button class="swell-referral-copy-button" id="swell-referral-copy-button" data-clipboard-target="#swell-referral-copy-link"><%= localization.referralCopyButton %></button> <p class="swell-referral-details"><%= localization.referralCopyDetails %></p> </div> </div> </div> <div>'
      }
    }
  };
}).call(this);

// tiers
(function() {
  window.SwellConfig = window.SwellConfig || {};

  SwellConfig.Tier = {
    getCustomerTierId: function() {
      var customer_tier, intro_tier, tiers;
      customer_tier = spapi.customer.vip_tier;
      tiers = spapi.activeVipTiers;
      if (customer_tier) {
        return customer_tier.id;
      } else {
        intro_tier = $.grep(tiers, function(e) {
          return e.swellrequiredAmountSpent === "$0" && e.swellrequiredAmountSpentCents === 0 && e.swellrequiredPointsEarned === 0 && e.swellrequiredPurchasesMade === 0 && e.swellrequiredReferralsCompleted === 0;
        });
        if (intro_tier.length > 0) {
          return intro_tier[0].id;
        } else {
          return null;
        }
      }
    },
    setupCustomerTierStatus: function() {
      customer_tier_id = SwellConfig.Tier.getCustomerTierId();

      tiers = spapi.activeVipTiers;
      tiers.forEach(function(tier) {
        if(tier.id  == customer_tier_id) {
          customer_tier = tier;
        }
      });
            
      tiers.forEach(function(tier) {
        if(tier.rank == customer_tier.rank) {

          if(spapi.customer.vip_tier_stats) {
            dollar_spent = spapi.customer.vip_tier_stats.amount_spent_cents / 100;
          } else {
            dollar_spent = 0;
          }

          name = tier.name;

          $(".swell-tier-table thead .swell-tier-status-row").append('<th> <div class="gradient-color"></div> <i class="swell-icon-group-3 drop-icon"> <span class="path1"></span> <span class="path2"></span> </i> <span class="current-tier">Current Status <span class="gold">' + name + '</span></span> <span class="has-spent">$' + dollar_spent +' Has Spent</span> </th>');
        } else {
          $(".swell-tier-table thead .swell-tier-status-row").append('<th> <div class="gradient-color"></div> </th>');
        }
      });

    },
    initializeDummyTier: function() {
      var k, len, tier, tiers;
      tiers = spapi.activeVipTiers;
      for (k = 0, len = tiers.length; k < len; k++) {
        tier = tiers[k];
        tier.rank += 1;
      }
      return tiers.unshift({
        id: -1,
        rank: 0,
        name: "Tier 1",
        swellrequiredAmountSpent: "$0",
        swellrequiredAmountSpentCents: 0,
        swellrequiredPointsEarned: 0,
        swellrequiredPurchasesMade: 0,
        swellrequiredReferralsCompleted: 0
      });
    },
    initializeTiers: function() {
      if (spapi.authenticated) {
        return SwellConfig.Tier.setupCustomerTierStatus();
      }
    }
  };
}).call(this);

