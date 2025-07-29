const middleware = {
	ensureLoggedIn: (req, res, next) => {
		if(req.isAuthenticated()) {
			return next();
		}
		req.flash("warning", "Please log in first to continue");
		res.redirect("/auth/login");
	},
	
	ensureAdminLoggedIn: (req, res, next) => {
		if(req.isUnauthenticated()) {
			req.session.returnTo = req.originalUrl;
			req.flash("warning", "Please log in first to continue");
			return res.redirect("/auth/login");
		}
		next();
	},

	

	ensureNotLoggedIn: (req, res, next) => {
		if(req.isAuthenticated()) {
			req.flash("warning", "Please logout first to continue");
			if(req.user.role == "donor")
				return res.redirect("/donor/dashboard");
			
		}
		next();
	}
	
}

module.exports = middleware;