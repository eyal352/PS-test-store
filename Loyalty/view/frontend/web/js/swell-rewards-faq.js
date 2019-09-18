const faqLogic = function(){
jQuery(".swell-faq-list li").click((e) => {
    jQuery(e.target).children("p.swell-faq-explanation, .button-container-faq.swell-faq-explanation").toggle();
    jQuery(e.target).siblings("p.swell-faq-explanation, .button-container-faq.swell-faq-explanation").toggle();
    if (jQuery(e.target).children("p.swell-faq-explanation").is(':visible') || jQuery(e.target).siblings(
        "p.swell-faq-explanation").is(':visible')) {
        if (jQuery(e.target).hasClass("swell-faq-load-more")) {
            jQuery(e.target).text("-")
        } else {
            jQuery(e.target).children(".swell-faq-load-more").text("-")
            jQuery(e.target).siblings(".swell-faq-load-more").text("-")
        }
    } else {
        if (jQuery(e.target).hasClass("swell-faq-load-more")) {
            jQuery(e.target).text("+")
        } else {
            jQuery(e.target).children(".swell-faq-load-more").text("+")
            jQuery(e.target).siblings(".swell-faq-load-more").text("+")
        }
    }
});
jQuery(".button-container-faq.swell-faq-explanation").hide();
}