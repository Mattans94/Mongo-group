Object.assign(Navbar.prototype, { template3(){ return `

<div class="dropdown">
	<button class="btn dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
		<i class="far fa-user"></i>
		${this.app.currentUser}
	</button>
	<div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
		<a class="dropdown-item" href="#"></a>
		<a class="dropdown-item" href="/mina_sidor">Mina sidor</a>
		<a class="dropdown-item" href="/">Logga ut
			<i class="fas fa-sign-out-alt ml-1 fa-lg"></i>
		</a>
	</div>
</div>

`;}});