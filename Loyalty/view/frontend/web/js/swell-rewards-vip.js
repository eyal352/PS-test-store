class VipSection {
  constructor(vipTiers, amountSpent) {
    this.vipTiers = vipTiers;
    this.amountSpent = amountSpent;
  }

  renderVipTiers() {
    this.vipTiers.forEach((tier, ind) => {
      jQuery('.vip-container .benefits-container').append(
        jQuery('<div>').addClass(`vip-level ${ind}`).css('background-color', tier.color).append(
          jQuery('<div>').addClass('table-header').append(
            jQuery('<p>').text(tier.level),
            jQuery('<span>').text(tier.levelAmount)
          ),
          jQuery('<div>').addClass('table-element').append(
            jQuery('<p>').text(tier.multiplier)
          )
        )
      )
      tier.discount.forEach(ele => {
        jQuery(`.vip-level.${ind}`).append(
          jQuery('<div>').html(`<p> ${ele} </p>`).addClass('table-element')
        )
      })
    });

    this.slickIfMobile();
  }

  slickIfMobile() {
    //on page load
    window.matchMedia("(min-width: 950px)").addListener(function (e) {
      if (e.matches && jQuery('.slick-initialized').length > 0) {
        jQuery(".vip-container .benefits-container").slick('unslick');
        console.log('unslick')
      } else {
        console.log('slick')
        jQuery(".vip-container .benefits-container").slick({

          //appendArrows: jQuery('.vip-container .button-container')
        });
        //   jQuery(".slick-prev.slick-arrow").html("<i class='fa fa-chevron-left' aria-hidden='true'></i>");
        //   jQuery(".slick-next.slick-arrow").html("<i class='fa fa-chevron-right' aria-hidden='true'></i>");
      }
    });
    // changes to screen size after page load 
    if (window.matchMedia("(max-width: 950px)").matches) {
      jQuery(".vip-container .benefits-container").slick({
        //appendArrows: jQuery('.vip-container .button-container')
      });
      //   jQuery(".slick-prev.slick-arrow").html("<i class='fa fa-chevron-left' aria-hidden='true'></i>");
      //    jQuery(".slick-next.slick-arrow").html("<i class='fa fa-chevron-right' aria-hidden='true'></i>");
    }
    // https://hacks.mozilla.org/2012/06/using-window-matchmedia-to-do-media-queries-in-javascript/
  }

  renderVipStatus(currentVipTier, vipTiersArray, customerEmail) {
    let IdsArray = vipTiersArray.map(tier => {
      return tier.id;
    });

    if (customerEmail !== undefined) {
      let currentTier;
      if (currentVipTier === null) {
        currentTier = 0
      } else {
        currentTier = IdsArray.indexOf(currentVipTier.id) + 1;
      }
      console.log(currentTier);
      jQuery(`.vip-level.${currentTier}`).css('margin-top', '0px').addClass('active-tier').prepend(
        jQuery('<p>').text('Current Status'),
        jQuery('<img>').attr('src', 'http://ps.yotpodev.com/magento2/pub/media/swell_assets/swell-down-line.svg')
      )
      jQuery(`.vip-level.${currentTier} .table-header p`).css('margin-top', '33px');
    }
  }

  renderVipHeader(amountSpent, vipTiers) {
    let tierAmounts = [];
    vipTiers.forEach(ele => {
      tierAmounts.push(ele.swellrequiredAmountSpentCents)
    })
    let requirementToSecondTier = tierAmounts[0] - amountSpent;
    let requirementToThirdTier = tierAmounts[1] - amountSpent;
    if (requirementToSecondTier > 0) {
      jQuery('h2.section-header').after(`<p>Unlock even more perks when you spend $${requirementToSecondTier / 100} or more and reach Jade. Ooh. </p>`);

    } else if (requirementToThirdTier > 0) {
      jQuery('h2.section-header').after(`<p>Unlock even more perks when you spend $${requirementToThirdTier / 100} or more and reach Sage. Ooh.</p>`);
    } else {
      jQuery('h2.section-header').after("You're in the top tier. Ooh.")
    }


  }
}