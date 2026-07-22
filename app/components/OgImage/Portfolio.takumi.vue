<script setup>
	defineProps({
		name: { type: String, required: false, default: 'Karol Jaroń' },
		role: {
			type: String,
			required: false,
			default: 'Full-Stack Web Developer',
		},
		headline: {
			type: String,
			required: false,
			default:
				'Websites, web applications, APIs and automation — built as one coherent system.',
		},
		availability: { type: String, required: false, default: 'available' },
		product: { type: String, required: false, default: 'Web interfaces' },
		api: { type: String, required: false, default: 'Backend APIs' },
		release: { type: String, required: false, default: 'Deployment' },
	});
</script>

<template>
	<div
		class="relative flex h-full w-full items-center justify-center overflow-hidden"
		style="font-family: 'Inter', 'Noto Sans'; background-color: #020a14; color: #eff6ff"
	>
		<div
			class="absolute inset-0"
			style="
				background-image:
					radial-gradient(circle at 12% 10%, rgba(34, 211, 238, 0.12), transparent 32%),
					radial-gradient(circle at 92% 88%, rgba(45, 212, 191, 0.08), transparent 34%);
			"
		/>
		<div
			class="absolute inset-0"
			style="
				background-image:
					linear-gradient(rgba(46, 70, 101, 0.11) 1px, transparent 1px),
					linear-gradient(90deg, rgba(46, 70, 101, 0.11) 1px, transparent 1px);
				background-size: 42px 42px;
				mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.42), transparent 82%);
			"
		/>

		<div
			class="relative flex flex-col overflow-hidden"
			style="
				width: 1092px;
				height: 530px;
				background-color: #061222;
				border: 1px solid #2e4665;
				border-radius: 22px;
				box-shadow: 0 28px 70px rgba(0, 0, 0, 0.38);
			"
		>
			<div
				class="flex items-center justify-between"
				style="
					height: 72px;
					padding: 0 34px;
					background-color: #030d19;
					border-bottom: 1px solid #2e4665;
				"
			>
				<div
					class="flex items-center"
					style="gap: 22px"
				>
					<div
						class="flex items-center"
						style="gap: 9px"
					>
						<span
							style="
								width: 13px;
								height: 13px;
								border-radius: 999px;
								background-color: #22d3ee;
							"
						/>
						<span
							style="
								width: 13px;
								height: 13px;
								border-radius: 999px;
								background-color: #94a3b8;
							"
						/>
						<span
							style="
								width: 13px;
								height: 13px;
								border-radius: 999px;
								background-color: #2e4665;
							"
						/>
					</div>
					<span style="font-size: 19px; letter-spacing: 0.055em; color: #94a3b8">
						portfolio.runtime
					</span>
				</div>

				<div
					class="flex items-center"
					style="
						gap: 11px;
						padding: 10px 16px;
						background-color: #071426;
						border: 1px solid #1f3149;
						border-radius: 999px;
					"
				>
					<span
						style="
							width: 9px;
							height: 9px;
							border-radius: 999px;
							background-color: #22d3ee;
						"
					/>
					<span style="font-size: 16px; letter-spacing: 0.04em; color: #94a3b8">
						{{ availability }}
					</span>
				</div>
			</div>

			<div
				class="flex flex-1"
				style="gap: 40px; padding: 40px 44px 42px 48px"
			>
				<div class="flex flex-1 flex-col justify-between">
					<div class="flex flex-col">
						<span style="font-size: 20px; letter-spacing: 0.035em; color: #22d3ee">
							$ whoami --public
						</span>
						<h1
							style="
								margin: 18px 0 0;
								font-size: 70px;
								font-weight: 700;
								line-height: 1;
								letter-spacing: -0.035em;
							"
						>
							{{ name }}
						</h1>
						<p
							style="
								margin: 17px 0 0;
								font-size: 28px;
								font-weight: 700;
								line-height: 1.2;
							"
						>
							{{ role }}
						</p>
						<p
							style="
								max-width: 610px;
								margin: 17px 0 0;
								font-size: 19px;
								line-height: 1.48;
								color: #94a3b8;
							"
						>
							{{ headline }}
						</p>
					</div>

					<div
						class="flex"
						style="gap: 9px"
					>
						<div
							v-for="(item, index) in [product, api, release]"
							:key="item"
							class="flex flex-1 flex-col"
							style="
								padding: 10px 13px;
								background-color: #030d19;
								border: 1px solid #1f3149;
								border-radius: 9px;
							"
						>
							<span style="font-size: 11px; color: #22d3ee">
								{{ String(index + 1).padStart(2, '0') }}
							</span>
							<span style="margin-top: 4px; font-size: 14px; color: #eff6ff">
								{{ item }}
							</span>
						</div>
					</div>
				</div>

				<div
					class="flex flex-col overflow-hidden"
					style="
						width: 346px;
						background-color: #030d19;
						border: 1px solid #1f3149;
						border-radius: 14px;
					"
				>
					<div
						class="flex items-center justify-between"
						style="height: 52px; padding: 0 20px; border-bottom: 1px solid #1f3149"
					>
						<span style="font-size: 15px; letter-spacing: 0.055em; color: #94a3b8">
							stack.trace
						</span>
						<span style="font-size: 12px; letter-spacing: 0.08em; color: #22d3ee">
							04 modules
						</span>
					</div>

					<div
						class="flex flex-1 flex-col"
						style="gap: 17px; padding: 22px 20px 20px"
					>
						<div
							v-for="(item, index) in [
								['interface', 'TypeScript / Vue / Nuxt'],
								['backend', 'Node / NestJS / PostgreSQL'],
								['automation', 'Python / APIs / CLI'],
								['release', 'Docker / Linux / Caddy'],
							]"
							:key="item[0]"
							class="flex items-start"
							style="gap: 11px"
						>
							<div
								class="flex items-center justify-center"
								style="
									width: 22px;
									height: 20px;
									background-color: rgba(34, 211, 238, 0.08);
									border: 1px solid #1f3149;
									border-radius: 5px;
								"
							>
								<span style="font-size: 9px; font-weight: 700; color: #22d3ee">
									{{ String(index + 1).padStart(2, '0') }}
								</span>
							</div>
							<div class="flex flex-col">
								<span
									style="font-size: 12px; letter-spacing: 0.045em; color: #22d3ee"
								>
									{{ item[0] }}
								</span>
								<span style="margin-top: 3px; font-size: 14px; color: #94a3b8">
									{{ item[1] }}
								</span>
							</div>
						</div>

						<div
							class="flex items-center justify-between"
							style="
								margin-top: auto;
								padding: 11px 13px;
								background-color: #071426;
								border: 1px solid #1f3149;
								border-radius: 8px;
							"
						>
							<span style="font-size: 13px; color: #94a3b8">output:</span>
							<span style="font-size: 13px; color: #22d3ee">full_stack=true</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
