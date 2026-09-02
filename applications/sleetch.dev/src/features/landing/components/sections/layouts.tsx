import preview from '@/assets/images/previews/docs.png';
import PixelBlast from '@/shared/components/effects/pixel-blast';

export function LandingLayouts() {
	return (
		<section className="relative isolate overflow-hidden rounded-xl border">
			<div className="absolute inset-0 z-0 pointer-events-none">
				<PixelBlast
					variant="square"
					pixelSize={4}
					color="#235edf"
					patternScale={3}
					patternDensity={1}
					pixelSizeJitter={0}
					enableRipples={false}
					rippleSpeed={0.4}
					rippleThickness={0.12}
					rippleIntensityScale={1.5}
					liquid={false}
					liquidStrength={0.12}
					liquidRadius={1.2}
					liquidWobbleSpeed={5}
					speed={0.5}
					edgeFade={0.25}
					transparent
					className="absolute inset-0 size-full"
				/>
			</div>

			<div className="relative z-10 flex min-h-full flex-col items-center justify-end gap-9 pt-16">
				<h1 className="fl-text-2xl/7xl font-brand font-bold">Built-in layouts</h1>
				<div className="w-full max-w-5xl px-6">
					<img src={preview} alt="Preview" className="h-auto w-full rounded-t-3xl border-x border-t" />
				</div>
			</div>
		</section>
	);
}
