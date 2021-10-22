// USE THIS TO GET THE "KEY" OF A SPECIFIC COLOR STYLE
// eg.
// id: "S:ed267c00c6d5dde56ac3be756eb1eb695c636d4a,"
// key: "ed267c00c6d5dde56ac3be756eb1eb695c636d4a"
// name: "Action/Foreground/Primary"

var styles = figma.getLocalPaintStyles();

styles.forEach(style => {
    if (style.name === 'Action/Foreground/Primary') {
        console.log({
            key: style.key,
            id: style.id,
            name: style.name,
        });
    }
    if (style.key === 'ed267c00c6d5dde56ac3be756eb1eb695c636d4a') {
        console.log({
            key: style.key,
            id: style.id,
            name: style.name,
        });
    }
});


// USE THIS PART TO EXTRACT THE STYLES FROM BOTH THE "SOURCE" FILE AND THE "DESTINATION" FILE (LIBRARY)
// we need the "name" and "key" values to import them in the "destination" file
// and re-link the styles to the Figma elements using the name as matching criteria

var styles = figma.getLocalPaintStyles();

var exportedStyles = {};

// mapping key → name
styles.forEach(style => {
    exportedStyles[style.key] = style.name;
});

// mapping name → key
styles.forEach(style => {
    exportedStyles[style.name] = style.key;
});

console.log(JSON.stringify(exportedStyles, null, 4));


// USE THIS PART TO RELINK THE STYLES IN THE "DESTINATION" FILE
// Notice: in our case, the destination file is the library itself

// key → name (104 styles)
var sourceStylesMapping = {
    "88f28452ee1a7cac2da410645591353b678666c7": "Neutral/Neutral 700",
    "ddc58fe6afa0615ebb71885ea9b3eae68622df48": "Neutral/Neutral 600",
    "aebb3a6c6f3256e244dd8243f287af4f2f506c66": "Neutral/Neutral 500",
    "e936779e9a89c4f70ee69be95064c62cd9b16f92": "Neutral/Neutral 400",
    "4219b7d86941eaf1eab9fea2f2272a1b01cfbe4b": "Neutral/Neutral 300",
    "52320f8476983e2b4c74668679b6c6db13da5214": "Neutral/Neutral 200",
    "51b4138257787fd6c511b4b994e7e7bcc3c88106": "Neutral/Neutral 100",
    "e2e34c3906cb5ca751740815696f3c53fe03c791": "Neutral/Neutral 50",
    "0055d79b3b7b39550f22cd030868bb98f4c9c173": "Neutral/Neutral 0",
    "f3a3956c71ce5778f89681c8333e4a3206b26898": "Neutral/Alpha 300",
    "7e4f4c219ee2c4cc7957334a8a65d072e848a813": "Neutral/Alpha 200",
    "eaf168288bfcecac41f73e5c22b742705b5603aa": "Neutral/Alpha 100",
    "ed267c00c6d5dde56ac3be756eb1eb695c636d4a": "Action/Foreground/Primary",
    "6ad8582cd36e1e6fb5f658d13187de4130961baf": "Action/Foreground/On Faint",
    "3ebd06fc41ae81f21c09fda362719c599c98c34e": "Action/Background/Primary",
    "1dbb6c9805aaa90493d11a701a0f1bcf54258a77": "Action/Background/Hover",
    "fce710a34c302762c4108a61d77c549f90dffdb9": "Action/Background/Active",
    "dea71dd3b240125ef64aef93c6cd416e1546e025": "Action/Background/Faint",
    "815b8d04dc526149ceb7f75f4b7b63de936fb9d0": "Action/Border/Primary",
    "ccbc0f28004170941adfe12bb8da0b06c5377855": "Action/Border/On Primary",
    "2676c6fb23c3a1761c95b06f497d42a668d7759f": "Action/Border/On Hover",
    "5891af441e9b4342ba60b6cf334b1824b8962f1c": "Action/Border/On Faint",
    "45217e3b8d720ec4449b7a8d9283ea57c0c76d82": "Highlight/Foreground/Primary",
    "3e95319f19b4a56f8a19caca72ca6e97e3b2cfe5": "Highlight/Foreground/On Faint",
    "a07de4497c7195a6b9d0f4adc549c6fd6ab548b3": "Highlight/Background/Primary",
    "37bb9f60825645851005bb20cd490fec9275e5e2": "Highlight/Background/Hover",
    "c1866e1c5e734f2234e6ffdb2ff5eb1f83943454": "Highlight/Background/Active",
    "d8d2bfd6a95ed3791c07e0fb72a26f8dee7f861a": "Highlight/Background/Faint",
    "b7122b899c6b3f677eb22c69421e1506e1c820bf": "Highlight/Border/Primary",
    "ad23d485c2ba6fec3c2cd7976d095d917db32252": "Highlight/Border/On Primary",
    "6ef0a4396cdc9a678c8f4ee58ad1a55d0f34e23e": "Highlight/Border/On Hover",
    "2de6759af1a51769d1f337d891e598be460af57c": "Highlight/Border/On Faint",
    "eb30aa80aa53898c1bab32db65f217facb116efd": "Success/Foreground/Primary",
    "fae1c3483b89d646eddb58122d90db61be54fa68": "Success/Foreground/On Faint",
    "a74de5226898ec798aa13797a01497b68487e2e9": "Success/Background/Primary",
    "8fc429d9db7cd08b4de28cfbe4e391d64acc9f38": "Success/Background/Hover",
    "92c79276e9c8e69c171e2af43a7efdb9517f81c6": "Success/Background/Active",
    "f6aae169e7cc0ce35e35f56ffdb9946f647a34ee": "Success/Background/Faint",
    "236f345d50746c7dcb3508923ada83a286949feb": "Success/Border/Primary",
    "4082d2665083974003036da609e96168a0a71434": "Success/Border/On Primary",
    "40c41b77b2749b0dfa0d329e21a4ef5ff12d9455": "Success/Border/On Hover",
    "09de6abfe48b5a6f4886e70e2ca24910154f25a8": "Success/Border/On Faint",
    "dab22fba2b7217486534cb9467e7b3340b36d1ee": "Warning/Foreground/Primary",
    "c3e0c1d247edf1f2427df7e052ce3fc61cee63c6": "Warning/Foreground/On Faint",
    "bbed0e1cda683c1a66d41decff9904a8a31bdf07": "Warning/Background/Primary",
    "575fc64c2cb1036a44f099709d2b57f08c0630f2": "Warning/Background/Hover",
    "43c5a374a8dafcaa78607fe91597863ab7972ce0": "Warning/Background/Active",
    "c6c6e4551ac7c2cccce848d6d8f00dd5e61ac87d": "Warning/Background/Faint",
    "7a3157e2c7b6bb29a4afb2b72f1e896f08379ea9": "Warning/Border/Primary",
    "082429e3b38c2c52b06045e9e2ec6cbcdf1f97b2": "Warning/Border/On Primary",
    "354cb700b4bd2b89becd3dc6e73d9eb8e115ddbe": "Warning/Border/On Hover",
    "a455cac4ebb73b6e6088a03052b4a12b787f4121": "Warning/Border/On Faint",
    "33c2ccb65ae2e07e9097bef932fcbdf1e41a6c83": "Critical/Foreground/Primary",
    "ef030d4a00a7afcdd260849543dc4b84991615f6": "Critical/Foreground/On Faint",
    "bec203dfb586b839a8a6b9c8b3fd82a0e9d90181": "Critical/Background/Primary",
    "6b810dcc22c84bdaf4c4f133d9719a63293429cb": "Critical/Background/Hover",
    "57c2b99523a75ee6087b89142b779c1b24ccf6ca": "Critical/Background/Active",
    "2209d3be1c09ab0886c5e7ea2d58de046e26cc58": "Critical/Background/Faint",
    "2857b0044c47fa5654053e61bc7db89837f6fc6f": "Critical/Border/Primary",
    "d7b3e25fd72846e524c895c8c67436b267e57fce": "Critical/Border/On Primary",
    "abf7228715ed922d12ef3564f41bcfd610ef6085": "Critical/Border/On Hover",
    "11329f53ca275caca6f830911f492a825a800342": "Critical/Border/On Faint",
    "df24522065a2c2f2299500364b5a4100467e0754": "Palette/Neutral/Neutral 700",
    "814a6e152426cdd8cb8e31de6f1a12364101706d": "Palette/Neutral/Neutral 600",
    "2995d24a28c634819fd4200637f8fcb4fac952e8": "Palette/Neutral/Neutral 500",
    "0a9563385aea3206f450ee998e8af0918400bb93": "Palette/Neutral/Neutral 400",
    "94b1a624b9d7f1f95ac6d956778255ed3ed88cc2": "Palette/Neutral/Neutral 300",
    "56b2873326a774d7e48bdc6b7ec3659dbcb49f30": "Palette/Neutral/Neutral 200",
    "69cf619d796fc334882870867fbcc01e26eaddbc": "Palette/Neutral/Neutral 100",
    "3bd87fa7b74e405176ad75b1787f7088bc00737a": "Palette/Neutral/Neutral 50",
    "66fd1927bf5b9b570d6765d7b3ec750b6522036b": "Palette/Neutral/Neutral 0",
    "b1c1ce79e66e8371296cefbb7c6ce941b3d1f2c8": "Palette/Alpha/Alpha 300",
    "3067cfda1f421c69c83e6f9a9d9b11a67c79d4fe": "Palette/Alpha/Alpha 200",
    "eab08fdc0ff82c7d5e80e454d2ce236d62d81302": "Palette/Alpha/Alpha 100",
    "144afeedffd261842ed35bc9180a0cd6c3ca488a": "Palette/Blue/Blue 400",
    "96c5ff748e14b28907196572febefdff617764af": "Palette/Blue/Blue 300",
    "6db94595e25bacaf4ded273633fc451aa5f91d07": "Palette/Blue/Blue 200",
    "25e23dabb9929285a1a8a562c565a99cf9285e71": "Palette/Blue/Blue 100",
    "6d83e4085687f4388b1c2f011558fec29572970a": "Palette/Blue/Blue 50",
    "91df77e46b972cf2b96fd61b14611e9cf8e15ab6": "Palette/Purple/Purple 400",
    "06231efd06a6f1bd25d20fdbbe3b7fd2e49fe069": "Palette/Purple/Purple 300",
    "1d2203b443d81bbf3cedeec21f2eefa3de271b76": "Palette/Purple/Purple 200",
    "337d8b8a98831c5be0cebb865b7670a82dbfea1d": "Palette/Purple/Purple 100",
    "fdfc663f2268cd5865cb07a729a2ef4cab3f58d3": "Palette/Purple/Purple 50",
    "0431237d3ebaceb227e0ea30de01867c30da659b": "Palette/Green/Green 400",
    "b985a245d5199bf5cac53bd29cc486ef4d3ee268": "Palette/Green/Green 300",
    "cc4f9e0017fc7d944e7b9321436a0a84f0bee607": "Palette/Green/Green 200",
    "376a3183d61e17e29a62ddda9ba0536e4526cb32": "Palette/Green/Green 100",
    "f75115bc454633e7681ef80a7c8d6963c098e11a": "Palette/Green/Green 50",
    "0dcfbba6079c71d44397fa62514c4e1da5ebff7f": "Palette/Amber/Amber 400",
    "8e4a1cac9b7e090b99226d765ab7bd4e37bcf61a": "Palette/Amber/Amber 300",
    "3b9d81adb731cb0133507622294e41e3f307752c": "Palette/Amber/Amber 200",
    "136dd22a9e7a418a4b4e99b29031c93f1ae8ced3": "Palette/Amber/Amber 100",
    "8d485968d49d52f693750f47d4864ac27f347aa3": "Palette/Amber/Amber 50",
    "5b00e07952a61ebfc100aefb28700b35d94d3278": "Palette/Red/Red 400",
    "23d362c3fc9f02d1854470f0604ca6f56d0b663f": "Palette/Red/Red 300",
    "972abc0e9e787c6f97aacb18c615b9d5447643f8": "Palette/Red/Red 200",
    "7e76bfa71803ee9cfe4dffaf92581a6d7e46dd48": "Palette/Red/Red 100",
    "3c823ba88a69cfcb8cda9a121600820b39f2be4e": "Palette/Red/Red 50",
    "991e8e75ba1bb30b3520f8d9b0a4116ed1d73750": "Gradients/Blue",
    "845d9ba21735ec6471949cc7b65004bc4816cef2": "Gradients/Green",
    "d9c56706dede5785164757cc95efeb3e5c3906b7": "Gradients/Candy",
    "f00cdf95c1aaf15dfa7787510bf48b910a689ffb": "Gradients/Purple",
    "5299fb7b26b1d0d8ba7e2cc3099742f652f52334": "Gradients/Terraform"
};

// name → key
var libraryStylesMapping = {
    "Neutral/Neutral 700": "eaa3f99a61436df68a13f1a9d249838f24a9242b",
    "Neutral/Neutral 600": "edd93a89d27b4c59018be972861e3847ed625a73",
    "Neutral/Neutral 500": "c160b637f76aca2142fbdf163ad3e2ce9d034724",
    "Neutral/Neutral 400": "ecc4ca78d8df5e4c84b85629b5e7af66d2e85a3c",
    "Neutral/Neutral 300": "11087d3f0fc82cee6e9562d71bbab6afd087e76e",
    "Neutral/Neutral 200": "080c669777b89743e7c8be81b2c9ab99bef0bc45",
    "Neutral/Neutral 100": "1ab3e2fd5ff3f0f8ab79e764d71e9cfe75c4c498",
    "Neutral/Neutral 50": "c8920e7ac5258a7b6566e3b3d89562c6224bc9f1",
    "Neutral/Neutral 0": "eccd8e7806b2013ca75909e5aaf6a49d46751f9b",
    "Neutral/Alpha 300": "1e8749485fcde49ca617229e92dbcbf6e388e032",
    "Neutral/Alpha 200": "b559120fce7140010c25ff645a576a6d5d01eb71",
    "Neutral/Alpha 100": "d884f82cebfa0f6deabdd41b17273c150efab8d5",
    "Action/Foreground/Primary": "25c851f2cbd0c1edd8c17609c768c0541ac8e146",
    "Action/Foreground/On Faint": "fb2a751efe52ea6a739b1d2d4969fa86ea0a0cb7",
    "Action/Background/Primary": "3a7119848e5e85946036becac131634ef53af60b",
    "Action/Background/Hover": "72beafe347fd7c450661e562dfd8e7299d413f81",
    "Action/Background/Active": "7598e57d8c2891e060fb82bc8fb3be7d64b40e0c",
    "Action/Background/Faint": "f2bd8f12cee3eb5eb1e3b92905e41a8e3fb73fb3",
    "Action/Border/Primary": "4db0855a70652c23120c6073da2d36f6eec5a641",
    "Action/Border/On Primary": "0b1bf93bfaa042cb953ddb292ea4ac1259ca1d81",
    "Action/Border/On Hover": "4580d76e3086b079aee4981c86a4e6c8ee93c4f5",
    "Action/Border/On Faint": "a8820679825dad675a07c38a310869b937d728f1",
    "Highlight/Foreground/Primary": "5c4698a433de83bb26c90bcbe73562382c4dbfcb",
    "Highlight/Foreground/On Faint": "84e4c20e7ff2fb9fb3b9245cad00dc70dd7ce09a",
    "Highlight/Background/Primary": "2ebc4c0030915203c88e9dbbadcfa6a3ef1545b9",
    "Highlight/Background/Hover": "2f5620b50dc3fbdd6827011078f815568d630510",
    "Highlight/Background/Active": "5316c95ab9309207198be050079a106d4e835719",
    "Highlight/Background/Faint": "665ddea877f7b23223967421be61e7094c78eecc",
    "Highlight/Border/Primary": "9a64e208f13805cd020a8a754ff3571c28c67cff",
    "Highlight/Border/On Primary": "eda5835ad9a37fee4f1e8e868666098498d0cb1f",
    "Highlight/Border/On Hover": "e6de8d140456ce84c4538e5999207b835dcf0e14",
    "Highlight/Border/On Faint": "d19e7629403bd4e296edad12425e15c2ebbc9be0",
    "Success/Foreground/Primary": "6fad53f7b9840242f95fc57288de94689460a1d5",
    "Success/Foreground/On Faint": "e82c667e1d50e804e98a8922926e9805fb1e219c",
    "Success/Background/Primary": "29d139af62b695efd3fe74dffa9914efd710b334",
    "Success/Background/Hover": "605434b123c8e2146e01cb669eb43b356e74e4c3",
    "Success/Background/Active": "753514512ad44ce5c82ad8087ec78e860487cfad",
    "Success/Background/Faint": "4584304e579bcd9e39327b2acc87914adcc7b8d6",
    "Success/Border/Primary": "6b2138d2b4945dad2a7b41cfd10e7557614f7b14",
    "Success/Border/On Primary": "897836bef15219106b4f3713c2044133606d09d2",
    "Success/Border/On Hover": "232ba2b9b5ce0cf60edfe70c30c6504c7b77508a",
    "Success/Border/On Faint": "d634dd04152bea1d693634ca0d4c5c71fbf6e3fe",
    "Warning/Foreground/Primary": "9bdc37ba48a1130b4cc3f7e1f15b42a5193963a1",
    "Warning/Foreground/On Faint": "0bf6e49360ca27bfc99c0cfb77bf135f4aef4af7",
    "Warning/Background/Primary": "fb606951cb7de9fef50630cb7fccd606399b79ed",
    "Warning/Background/Hover": "05f8ef0c5d52ab347d4333495186b871697fc06a",
    "Warning/Background/Active": "378ccaaa359620d2836376856cc1e974cf339633",
    "Warning/Background/Faint": "92c71ff2c7e3997b9b2f12bc0086f7f97e4e6024",
    "Warning/Border/Primary": "7e1b1b4dd5be115c3b3c9b5196ae81966168ec0a",
    "Warning/Border/On Primary": "7a8448cab1616126e94879df645561d8eba41f7a",
    "Warning/Border/On Hover": "7c2c92dcf0061dc01457c1d50a61fdba42171ffa",
    "Warning/Border/On Faint": "87eaf0fcebfd7fd9e8ec2619e2761ff81f659ed1",
    "Critical/Foreground/Primary": "53b3bf1161adab803934f4b3d39533bbec54b6fb",
    "Critical/Foreground/On Faint": "87dd49149c9f471247b15e28a94193a31cc9efbe",
    "Critical/Background/Primary": "ade12458ab0c430757e8e26420bfcc7e42051515",
    "Critical/Background/Hover": "abe36c68868e2f9491d52c0238154d52d5ea54ea",
    "Critical/Background/Active": "6b97e564799c0c703aed97aebf57435c3735c830",
    "Critical/Background/Faint": "c1fc9d54de89f12b76a9068115c81f9ec410229d",
    "Critical/Border/Primary": "ecb25d8d9f6664c1ee77aa59c47a8d1ee657fc8d",
    "Critical/Border/On Primary": "60355b5a05cfd69ff5d6db169c41ebbe12d3581c",
    "Critical/Border/On Hover": "7ed9ce16601c99e9f128f9c849256cc5903dd437",
    "Critical/Border/On Faint": "c892c7d97a736189f5fec1d4a3fe1dc64e3895a4",
    "Palette/Neutral/Neutral 700": "6dc34d3c0cad7d6946b4a7c0389897cae18e50a0",
    "Palette/Neutral/Neutral 600": "5743e03dd96f3844ce9b1e1311abe9002ea9d9f9",
    "Palette/Neutral/Neutral 500": "6c836a6818fc56b4b579833d42fb747e5d3e2235",
    "Palette/Neutral/Neutral 400": "ee2f90c7c07fdecc0354b8ffb503039b37121ad5",
    "Palette/Neutral/Neutral 300": "26457b54586d627c0bd3095ece6910bda28b8280",
    "Palette/Neutral/Neutral 200": "d0fcca4274d9228ad3ef0db099bf7728c34f4004",
    "Palette/Neutral/Neutral 100": "bd95c57ae30e7412dc1ead92a7152436d3d21d22",
    "Palette/Neutral/Neutral 50": "26cfbc1fdd40c21e824d61db03369d3e5e22b833",
    "Palette/Neutral/Neutral 0": "3bec81b659de3c014e8d2095fdba352291f5e66b",
    "Palette/Alpha/Alpha 300": "aecd4e2fd4eb8394bb8d626d9423c3b1ff85a04f",
    "Palette/Alpha/Alpha 200": "79d6ae4a438145a0ba84930de3b73cb48af71062",
    "Palette/Alpha/Alpha 100": "9f979a1b9e2fb5135fee2cf77a58ba809d5afcab",
    "Palette/Blue/Blue 400": "49e7ddeccdc513cae4c861bdc3c11655290ec6d1",
    "Palette/Blue/Blue 300": "9d3d37d376b4751b03c4bef92dafbe9d2f09afff",
    "Palette/Blue/Blue 200": "1c5d272737fb24760b6be1b6781df63fb45ced72",
    "Palette/Blue/Blue 100": "e3c6cb95aab6345b5febb1ae00fd424c58662354",
    "Palette/Blue/Blue 50": "7efd87734781cd83452b22f0baf0866e279a43cd",
    "Palette/Purple/Purple 400": "fef4050a2c173beaa18ab582b28c316da81e2c6c",
    "Palette/Purple/Purple 300": "b2311193c6d1e3565ffa7f7f93ec3b1cca2f7075",
    "Palette/Purple/Purple 200": "77c091135d8881057de6748a8eab3e2f41b377b9",
    "Palette/Purple/Purple 100": "9b11220965f73ff3ac9c4523f3591a1ae711debf",
    "Palette/Purple/Purple 50": "32e2d5edd04b7bd8849e5c6b920bd827cca186a1",
    "Palette/Green/Green 400": "193d0cd3672571d76434a2afe9fb9530fe9816b1",
    "Palette/Green/Green 300": "f20122aa00f811e9daef0172b28b264b04b75e81",
    "Palette/Green/Green 200": "342a9bdf021d7a07d6e69951fee42c994cd1c8d1",
    "Palette/Green/Green 100": "f095d98241510b304861b0ed4fffc425d22f86e9",
    "Palette/Green/Green 50": "11e140d79c3438b4cf76d202f0c68fc0063e8f56",
    "Palette/Amber/Amber 400": "6d2ca2271dc64fe9a1e7a94a732575797a95e088",
    "Palette/Amber/Amber 300": "12cbc8e1a3536a9f007d2337b58b5da73b77d764",
    "Palette/Amber/Amber 200": "483ae15f1991b7303c9b1efcba7a5c036d421d6b",
    "Palette/Amber/Amber 100": "cac968eb7ec4e94d79e1ad94f009a6a499baf7bd",
    "Palette/Amber/Amber 50": "8863b1a024d5777828dd39f3d066ccbbb2c394fa",
    "Palette/Red/Red 400": "110d1e9f87e2403f025859685523a2b650c54a5b",
    "Palette/Red/Red 300": "586318c4c28c244cb520adb2e8293c654bece9f6",
    "Palette/Red/Red 200": "5a541b55aec0a19d7de45604b1f580d5e48c56fa",
    "Palette/Red/Red 100": "080feaa6c03d1d47168510a0c6dba1ab9c9e80e7",
    "Palette/Red/Red 50": "705fe7a153af3531608dc56e3865ec0350b825ad",
    "Gradients/Blue": "bafa64711b2e7432fb0dbd91d0d09049afb63110",
    "Gradients/Green": "03a3f515de34991f277bedaf5f1274385a519678",
    "Gradients/Candy": "dfb0423554329094d42af88af7b214be56f05aad",
    "Gradients/Purple": "57bdc53cab41a71785280bc78b940392bbedb4ce",
    "Gradients/Terraform": "f229100f880db8d7c0fbd08d0d5bfff16d983191"
};

var sourceStylesKeys = Object.keys(sourceStylesMapping);

var getStyleKeyFromId = (id) => {
    // the format returned by the Figma Plugin API for "fillStyleId" is something like "S:19fa889c02aee580c44b9dc8a87864a58ddac09a,1:7"
    const match = String(id).match(/^S:(\w+),.*$/);
    const key = match[1];
    return key;
}

// FILL NODES (298 nodes)
//
var allFillNodes = figma.currentPage.findAll((node) => {
    if (node.fillStyleId) {
        const styleKey = getStyleKeyFromId(node.fillStyleId);
        const isLocalStyle = sourceStylesKeys.includes(styleKey);
        return isLocalStyle;
    } else {
        return false;
    }
});
console.log(`Found ${allFillNodes.length} nodes with "fill" style applied`);

if (allFillNodes.length > 0) {
    allFillNodes.forEach(async (node) => {
        const nodeStyleKey = getStyleKeyFromId(node.fillStyleId); // the key comes from the source file
        const nodeStyleName = sourceStylesMapping[nodeStyleKey];
        const libraryStyleKey = libraryStylesMapping[nodeStyleName];

        if (libraryStyleKey) {
            console.log(`Found ${node.name} with style ${node.fillStyleId} / ${nodeStyleName}`);
            const importedFillStyleFigmaObject = await figma.importStyleByKeyAsync(libraryStyleKey);
            // debuggingLog('importedFillStyleFigmaObject', importedFillStyleFigmaObject);
            if (importedFillStyleFigmaObject) {
                // debuggingLog(`Replacing "text" style ${currentTextStyleKey} with ${clonedTextStyleKey}`);
                node.fillStyleId = importedFillStyleFigmaObject.id;
            }
        } else {
            console.log('Error!', node, nodeStyleKey, nodeStyleName, libraryStyleKey);
        }
    });
}


// STROKE NODES (40 nodes)
//
var allStrokeNodes = figma.currentPage.findAll((node) => {
    if (node.strokeStyleId) {
        const styleKey = getStyleKeyFromId(node.strokeStyleId);
        const isLocalStyle = sourceStylesKeys.includes(styleKey);
        return isLocalStyle;
    } else {
        return false;
    }
});
console.log(`Found ${allStrokeNodes.length} nodes with "stroke" style applied`);

if (allStrokeNodes.length > 0) {
    allStrokeNodes.forEach(async (node) => {
        const nodeStyleKey = getStyleKeyFromId(node.strokeStyleId); // the key comes from the source file
        const nodeStyleName = sourceStylesMapping[nodeStyleKey];
        const libraryStyleKey = libraryStylesMapping[nodeStyleName];

        if (libraryStyleKey) {
            console.log(`Found ${node.name} with style ${node.strokeStyleId} / ${nodeStyleName}`);
            const importedStrokeStyleFigmaObject = await figma.importStyleByKeyAsync(libraryStyleKey);
            // debuggingLog('importedStrokeStyleFigmaObject', importedStrokeStyleFigmaObject);
            if (importedStrokeStyleFigmaObject) {
                // debuggingLog(`Replacing "text" style ${currentTextStyleKey} with ${clonedTextStyleKey}`);
                node.strokeStyleId = importedStrokeStyleFigmaObject.id;
            }
        } else {
            console.log('Error!', node, nodeStyleKey, nodeStyleName, libraryStyleKey);
        }
    });
}