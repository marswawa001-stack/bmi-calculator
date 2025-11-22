export function AnnealingCalculatorGuide() {
  return (
    <div className="space-y-6">
      {/* What is PCR Annealing? */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">❓ What is the PCR Annealing Temperature?</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            The annealing temperature (Ta) is the temperature in the second phase of a PCR thermal cycle where DNA primers bind (anneal) to their complementary target sequences. This temperature is critical for PCR success.
          </p>
          <div className="bg-teal-50 p-4 rounded-lg border-l-4 border-teal-600">
            <p className="font-semibold text-teal-800">Key Point:</p>
            <p className="text-sm mt-1">Too high: Primers won't bind at all. Too low: Primers may bind to non-specific sequences, creating unwanted products.</p>
          </div>
          <p>
            The optimal Ta depends on the melting temperatures (Tm) of your primers and target DNA. Getting this right maximizes specificity while maintaining amplification efficiency—a delicate balance that's crucial for successful PCR experiments.
          </p>
        </div>
      </div>

      {/* How to Use the Calculator */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔧 How to Use This Calculator</h2>
        <div className="space-y-4 text-gray-700">
          <ol className="list-decimal list-inside space-y-3 ml-2">
            <li><strong>Obtain Your Tm Values:</strong> You need the melting temperature of your primers and your target DNA. These can be calculated using online tools, primer design software, or published methods.</li>
            <li><strong>Select Units:</strong> Choose the temperature unit (°C, °F, or K) for each input. You can use different units for each—the calculator handles conversion automatically.</li>
            <li><strong>Enter Primer Tm:</strong> Input the melting temperature of the <em>less stable primer</em> (the lower Tm if you have two primers).</li>
            <li><strong>Enter Target Tm:</strong> Input the melting temperature of your target DNA template.</li>
            <li><strong>Get Instant Results:</strong> The calculator displays your optimal Ta immediately, along with a recommended experimental range and practical tips.</li>
            <li><strong>Copy and Use:</strong> Click "Copy result" to save the recommended temperature to your clipboard for lab notes or experiment records.</li>
          </ol>
          <div className="bg-indigo-50 p-4 rounded-lg border-l-4 border-indigo-600 mt-4">
            <p className="text-sm font-semibold">💡 Pro Tip: Start with the recommended temperature and perform a gradient PCR (±1–3°C) to fine-tune for your specific reaction conditions.</p>
          </div>
        </div>
      </div>

      {/* Understanding the Formula */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">📐 The Annealing Temperature Formula</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Our calculator uses the empirical formula developed to estimate optimal annealing temperatures:
          </p>
          <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-600">
            <p className="font-mono text-center font-bold text-lg">Ta = 0.3 × Tm<sub>primer</sub> + 0.7 × Tm<sub>target</sub> − 14.9</p>
            <p className="text-xs text-gray-600 mt-2 text-center">(Temperature in Celsius)</p>
          </div>
          <p className="text-sm">
            This formula weighs the target DNA Tm more heavily (70%) because it's generally more stable than primers. The constant (−14.9) accounts for the thermodynamic properties of primer-target interactions under typical PCR conditions. If you use Fahrenheit or Kelvin, the calculator automatically converts to Celsius, applies the formula, and converts the result back.
          </p>
          
          <div className="bg-blue-50 p-4 rounded-lg border-l-4 border-blue-600 mt-4">
            <p className="text-sm font-semibold text-blue-800">📚 Scientific Basis</p>
            <p className="text-xs text-gray-700 mt-2">
              This formula is derived from the foundational PCR optimization work by <strong>Rychlik et al. (1990)</strong> published in <em>Nucleic Acids Research</em>. It builds upon the melting temperature calculations established by <strong>Allawi and SantaLucia Jr. (1997)</strong> for DNA thermodynamics. The formula represents the empirical best practice used across molecular biology labs worldwide for rapid PCR primer annealing temperature estimation.
            </p>
          </div>
        </div>
      </div>

      {/* Practical Experiment Tips */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🧬 Practical Experiment Tips</h2>
        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Gradient PCR</p>
            <p className="text-sm mt-1 text-gray-800">Don't assume your first calculation is perfect. Most thermal cyclers support gradient PCR, where you run the same reaction at slightly different temperatures (Ta ± 2°C). This helps you find the sweet spot for your specific primers and template.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Touchdown PCR</p>
            <p className="text-sm mt-1 text-gray-800">If you get non-specific bands, try starting at a higher temperature (Ta + 2–3°C) and gradually lowering it by 0.5–1°C per cycle for 5–10 cycles, then continue at the final temperature. This increases specificity while giving primers time to find their targets.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Primer Design Matters</p>
            <p className="text-sm mt-1 text-gray-800">If your two primers have very different Tm values ({'>'}5°C apart), it's worth reconsidering your primer design. Ideally, both primers should have similar Tm values for optimal amplification.</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="font-semibold text-gray-800">Salt and Mg²⁺ Concentration</p>
            <p className="text-sm mt-1 text-gray-800">Higher salt and magnesium concentrations stabilize primer-template interactions, allowing lower annealing temperatures. If you're struggling with non-specific amplification, adjusting buffer composition can help more than temperature alone.</p>
          </div>
        </div>
      </div>

      {/* Troubleshooting */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🔍 Troubleshooting Common Issues</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">❌ No PCR product or very faint bands</p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Possible causes:</strong> Temperature too high, poor primer design, low template concentration, or missing/expired reagents.
              <br /><strong>Solutions:</strong> Try lowering Ta by 1–2°C; verify primers are correctly designed and stored; check template quality; ensure polymerase is active.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">🔀 Multiple bands or smearing</p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Possible causes:</strong> Temperature too low causing non-specific binding, primer dimers, or contamination.
              <br /><strong>Solutions:</strong> Raise Ta by 1–2°C or use Touchdown PCR; check for primer dimer issues using online tools; try reducing primer concentration slightly.
            </p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">💧 Weak or inconsistent results</p>
            <p className="text-sm text-gray-700 mt-2">
              <strong>Possible causes:</strong> Suboptimal Ta, primer-template Tm mismatch, or environmental factors.
              <strong>Solutions:</strong> Perform a gradient PCR to optimize Ta; if Tm values differ by {'>'}10°C, redesign primers; ensure consistent thermal cycler performance and sample preparation.
            </p>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">❔ Frequently Asked Questions</h2>
        <div className="space-y-4">
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">Q: Why do I need to enter the melting temperature (Tm) of the <em>less stable</em> primer?</p>
            <p className="text-sm text-gray-700 mt-2">A: The primer with the lower Tm is more prone to dissociation during the annealing phase. It's the "weakest link" that determines the minimum temperature needed for both primers to stay bound. Using the lower Tm ensures you don't raise the temperature so high that even the stable primer falls off.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">Q: Can I use this calculator if my primers have very similar Tm values?</p>
            <p className="text-sm text-gray-700 mt-2">A: Yes! If both primers have nearly identical Tm values, just enter that value for both inputs. The calculator will give you an optimal Ta that works well for both. This is actually ideal—it means your primers are well-matched.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">Q: What if I don't know my primer or target Tm values?</p>
            <p className="text-sm text-gray-700 mt-2">A: You can estimate Tm using the simple Wallace rule (Tm ≈ 4 × #GC + 2 × #AT for short primers) or, better yet, use your primer design software or online Tm calculators that account for salt concentration, primer length, and GC content. Many primer suppliers also provide Tm in their specifications.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">Q: Is this formula accurate for all PCR conditions?</p>
            <p className="text-sm text-gray-700 mt-2">A: The formula is a solid empirical approximation for standard PCR buffers and magnesium concentrations. However, if you're using non-standard conditions (very high salt, unusual Mg²⁺ levels, high DMSO percentage), you may need to adjust Ta experimentally. Always perform a gradient or touchdown PCR to verify.</p>
          </div>
          <div className="border-b border-gray-200 pb-4">
            <p className="font-semibold text-gray-800">Q: Why can I specify different units for primer and target Tm?</p>
            <p className="text-sm text-gray-700 mt-2">A: Different labs use different standards. Some work in Celsius, others in Fahrenheit (especially in the US), and publications sometimes use Kelvin. Our calculator accepts any combination and handles the math—so you never have to worry about conversion errors.</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Q: What's the difference between annealing temperature and melting temperature?</p>
            <p className="text-sm text-gray-700 mt-2">A: Melting temperature (Tm) is the temperature at which 50% of a DNA double strand is denatured (separated). Annealing temperature (Ta) is the specific phase in PCR where primers bind to the target. Ta is typically lower than Tm—primers don't need as much energy to bind initially as they do to fully denature long DNA strands.</p>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">🚀 Next Steps</h2>
        <div className="space-y-4 text-gray-700">
          <p>
            Once you have your recommended annealing temperature, it's time to take your PCR to the bench:
          </p>
          <ol className="list-decimal list-inside space-y-2 ml-2">
            <li>Set up your PCR master mix with your primers, target DNA, and reagents.</li>
            <li>Program your thermal cycler to use the recommended Ta for the annealing phase (typically 30–40 seconds).</li>
            <li>Run a gradient PCR at ±1–3°C if available to fine-tune the temperature.</li>
            <li>Check your product on an agarose gel to verify size and specificity.</li>
            <li>Once optimized, save your exact conditions in your lab notebook for reproducibility.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}
