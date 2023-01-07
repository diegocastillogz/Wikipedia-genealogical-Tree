<div class="spinner-container">
	<div class="spinner" />
</div>

<style>
	.spinner-container {
		display: flex;
		position: absolute;
		background-color: var(--gray);
		color: white;
		top: 0px;
		left: 0px;
		z-index: 1000;
		width: 100%;
		height: calc(100% - 80px);
		opacity: 0.5;
		overflow-y: hidden;
	}

	.spinner {
		margin: auto;
		border: 4px solid rgba(0, 0, 0, 0.1);
		width: 50px;
		height: 50px;
		border-radius: 50%;
		border-left-color: var(--white);
		animation: spin 1s linear infinite;
	}
	@keyframes spin {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
</style>
