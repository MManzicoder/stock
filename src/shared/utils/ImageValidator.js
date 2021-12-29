export default function validate(text,category) {
    let nation = ['itariki','indang','republic','amazina','national','identity','birth','igitsina','date','umikono','ind','it r','repubulika','re','repubul','umuko','umukono','umuk','indangamuntu','wa','','rwanda','republic','aho','yatangiwe','umurenge','no'];
    let cards = ['ministeri','y','ubuzima','life','insurance','ikarita','ubwisungane','kwivuza']
    let certificates = ['this','is','to','certify','candidate','republic','rwanda','education','grade','the','award','names','grade','level','indicated','below']
    let driving = ['republic','uruhushya','amazina','rwo','gutw','ara','gutwara','ibinya','biziga','ibinyabiziga','yavutse','driving','lic','license','driv','drivi','irangira','date','of','dat','birth','bir','class','yatang','yatangiwe','rwanda','yu']
    let matching = 0;
    let matcher;
    switch(category){
        case '60a93cbb0df9723780b334b1':
            matcher = nation
            break
        case '60afc01c4aa4cb37fcf899cc':
            matcher = cards
            break
        case '60afc0084aa4cb37fcf899cb': 
            matcher = certificates
            break
        case '60a93d06e90e111cf407f7fb': 
            matcher = driving
            break
        default:
            matcher = []

    }

    matcher.forEach(word=>{
        if(text.toLowerCase().includes(word.toLowerCase())){
          
          matching++;
        }
    })

    return matching;

}