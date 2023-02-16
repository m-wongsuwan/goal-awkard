const { encryptString, decryptString } = require('encrypt-string');

(async () => {
	const secret = 'This is the secret';
	const password = 'goblin!';

	const encrypted = await encryptString('i like hairy butts', 'goblin');
	console.log(encrypted);
	//=> !!(AP#M4i]$9<c0,iw4;%a4/C%*@EB0jp'+$$pww]yLPd3[G'2/eS`@_u/[@.dfF#$9]Xl2:o:@FkoOA'@jq}=`f$W!>gbX1L678@ghM`.=7V(K:db]M5i{u5[ga~CojWx'M_e7;#~lD-aVDs-D_o)+e16d:-`Dz!bVJ3

	const decrypted = await decryptString(encrypted, 'goblin');
	console.log(decrypted);
	//=> 'This is the secret'

})();