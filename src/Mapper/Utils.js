function verifier(obj) {
	if (!obj) return null;

	for (const field in obj) {
		if (!field) return null;
	}
	return obj;
}

module.exports = verifier;
