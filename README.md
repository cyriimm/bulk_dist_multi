# bulk_dist_multi
 Multi_drop Upgraded



CSV requires 

destination_address,amount,associated_token_address,token_mint_address


Current issues: 

 1) Types error(but stll runs)
 2) Txs need to be batched to avoid 'too many requests' issue so that when dropping to 1000s of different accounts this doesn't occur
 3) UI (replace sollet balance interface with better friendlier easier UI) 
