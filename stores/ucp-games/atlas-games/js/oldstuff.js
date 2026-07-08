

	if (isSeleniteHash(location.hash.substring(1))) {
		decodedHash = JSON.parse(enc.decode(location.hash.substring(1)));
		if (decodedHash["selenite"]) {
			if (decodedHash["pass"]) {
				tryPass(decodedHash["pass"]);
			}
			if (decodedHash["theme"]) {
				if (changeTheme) {
					alert("theme detected!!");
				}
			}
		}
	}
