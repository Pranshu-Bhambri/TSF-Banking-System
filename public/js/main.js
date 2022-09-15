window.addEventListener( "pageshow", function ( event ) {
    var perfEntries = performance.getEntriesByType("navigation");
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                perfEntries[0].type === "back_forward" );
    if ( historyTraversal ) {
      // Handle page restore.
    //   console.log("relaod");
      window.location.reload();
    }
});