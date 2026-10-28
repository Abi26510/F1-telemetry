/**
 * Track SVG Mapper for all 78 Formula 1 Championship Circuits
 * Maps any circuit object to its corresponding SVG in /track_svgs/
 */

export function getTrackSvg(circuit) {
  if (!circuit) return '/track_svgs/bahrain.svg';

  const rawText = `${circuit.name || ''} ${circuit.circuit_name || ''} ${circuit.location || ''} ${circuit.country || ''} ${circuit.id || ''}`.toLowerCase();
  const text = rawText.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // strip accents like São -> Sao, Nürburgring -> Nurburgring

  const hasWord = (w) => new RegExp(`\\b${w}\\b`, 'i').test(text);

  // 1. Current / Modern Era Grand Prix Circuits (All 2023 / 2024 rounds)
  if (text.includes('sakhir') || text.includes('bahrain')) return '/track_svgs/bahrain.svg';
  if (text.includes('jeddah') || text.includes('saudi')) return '/track_svgs/jeddah.svg';
  if (text.includes('melbourne') || text.includes('albert park')) return '/track_svgs/melbourne.svg';
  if (text.includes('baku') || text.includes('azerbaijan')) return '/track_svgs/baku.svg';
  if (text.includes('miami')) return '/track_svgs/miami.svg';
  if (text.includes('monaco') || text.includes('monte carlo') || text.includes('monte-carlo')) return '/track_svgs/monaco.svg';
  if (text.includes('catalunya') || text.includes('barcelona') || (text.includes('spanish') && !text.includes('jerez') && !text.includes('jarama') && !text.includes('valencia') && !text.includes('montjuic') && !text.includes('pedralbes'))) return '/track_svgs/barcelona.svg';
  if (text.includes('villeneuve') || text.includes('montreal') || (text.includes('canad') && !text.includes('mosport') && !text.includes('tremblant'))) return '/track_svgs/montreal.svg';
  if (text.includes('red bull ring') || text.includes('spielberg') || text.includes('osterreichring') || hasWord('austria') || text.includes('austrian') || text.includes('styrian') || text.includes('styria')) return '/track_svgs/austria.svg';
  if (text.includes('silverstone') || text.includes('british') || text.includes('70th anniversary')) return '/track_svgs/silverstone.svg';
  if (text.includes('hungaroring') || text.includes('budapest') || text.includes('hungar')) return '/track_svgs/hungaroring.svg';
  if (hasWord('spa') || text.includes('francorchamps') || text.includes('spa-francorchamps')) return '/track_svgs/spa.svg';
  if (text.includes('zandvoort') || text.includes('dutch') || text.includes('netherlands')) return '/track_svgs/zandvoort.svg';
  if (text.includes('monza') || (text.includes('italian') && !text.includes('imola') && !text.includes('mugello') && !text.includes('pescara'))) return '/track_svgs/monza.svg';
  if (text.includes('marina bay') || text.includes('singapore')) return '/track_svgs/singapore.svg';
  if (text.includes('suzuka') || (text.includes('japan') && !text.includes('fuji') && !text.includes('aida') && !text.includes('okayama'))) return '/track_svgs/suzuka.svg';
  if (text.includes('lusail') || text.includes('losail') || text.includes('qatar')) return '/track_svgs/lusail.svg';
  if (text.includes('cota') || text.includes('circuit of the americas') || text.includes('austin')) return '/track_svgs/cota.svg';
  if (text.includes('hermanos rodriguez') || text.includes('rodriguez') || text.includes('mexico')) return '/track_svgs/mexico.svg';
  if (text.includes('interlagos') || text.includes('jose carlos pace') || text.includes('sao paulo') || (text.includes('brazil') && !text.includes('jacarepagua'))) return '/track_svgs/interlagos.svg';
  if (text.includes('las vegas') || text.includes('lasvegas') || text.includes('vegas strip')) return '/track_svgs/lasvegas.svg';
  if (text.includes('yas marina') || text.includes('yas island') || text.includes('abu dhabi')) return '/track_svgs/abudhabi.svg';

  // 2. Classic & Historical Grand Prix Circuits
  // US Historical venues
  if (text.includes('indianapolis') || text.includes('brickyard') || hasWord('indy')) return '/track_svgs/indianapolis.svg';
  if (text.includes('watkins glen') || hasWord('watkins')) return '/track_svgs/watkins-glen.svg';
  if (text.includes('long beach')) return '/track_svgs/long-beach.svg';
  if (text.includes('detroit')) return '/track_svgs/detroit.svg';
  if (text.includes('dallas') || text.includes('fair park')) return '/track_svgs/dallas.svg';
  if (text.includes('phoenix')) return '/track_svgs/phoenix.svg';
  if (text.includes('sebring')) return '/track_svgs/sebring.svg';
  if (text.includes('riverside')) return '/track_svgs/riverside.svg';
  if (text.includes('caesars palace') || text.includes('caesar')) return '/track_svgs/caesars-palace.svg';

  // European & Global Historical venues
  if (text.includes('imola') || text.includes('san marino') || text.includes('emilia romagna') || text.includes('enzo e dino ferrari')) return '/track_svgs/imola.svg';
  if (text.includes('shanghai') || text.includes('chinese') || hasWord('china')) return '/track_svgs/shanghai.svg';
  if (text.includes('sochi') || text.includes('russian') || hasWord('russia')) return '/track_svgs/sochi.svg';
  if (text.includes('nurburgring') || text.includes('eifel')) return '/track_svgs/nurburgring.svg';
  if (text.includes('hockenheim')) return '/track_svgs/hockenheim.svg';
  if (text.includes('istanbul') || text.includes('turkish') || hasWord('turkey')) return '/track_svgs/istanbul.svg';
  if (text.includes('sepang') || text.includes('malaysia')) return '/track_svgs/sepang.svg';
  if (text.includes('portimao') || text.includes('algarve')) return '/track_svgs/portimao.svg';
  if (text.includes('paul ricard') || text.includes('castellet')) return '/track_svgs/paulricard.svg';
  if (text.includes('mugello') || text.includes('tuscan')) return '/track_svgs/mugello.svg';
  if (text.includes('magny-cours') || text.includes('magny cours')) return '/track_svgs/magny-cours.svg';
  if (text.includes('fuji')) return '/track_svgs/fuji.svg';
  if (text.includes('yeongam') || text.includes('korean') || hasWord('korea')) return '/track_svgs/korea.svg';
  if (text.includes('buddh') || text.includes('greater noida') || (hasWord('india') && !text.includes('indianapolis'))) return '/track_svgs/india.svg';
  if (text.includes('valencia')) return '/track_svgs/valencia.svg';
  if (text.includes('jerez')) return '/track_svgs/jerez.svg';
  if (text.includes('jarama')) return '/track_svgs/jarama.svg';
  if (text.includes('estoril') || text.includes('cascais')) return '/track_svgs/estoril.svg';
  if (text.includes('adelaide')) return '/track_svgs/adelaide.svg';
  if (text.includes('brands hatch') || text.includes('brands')) return '/track_svgs/brands-hatch.svg';
  if (text.includes('aintree')) return '/track_svgs/aintree.svg';
  if (text.includes('donington')) return '/track_svgs/donington.svg';
  if (text.includes('zolder')) return '/track_svgs/zolder.svg';
  if (text.includes('nivelles')) return '/track_svgs/nivelles.svg';
  if (text.includes('dijon')) return '/track_svgs/dijon.svg';
  if (text.includes('reims')) return '/track_svgs/reims.svg';
  if (text.includes('rouen')) return '/track_svgs/rouen.svg';
  if (text.includes('charade') || text.includes('clermont')) return '/track_svgs/charade.svg';
  if (text.includes('le mans') || text.includes('bugatti')) return '/track_svgs/le-mans.svg';
  if (text.includes('mosport')) return '/track_svgs/mosport.svg';
  if (text.includes('mont-tremblant') || text.includes('tremblant')) return '/track_svgs/mont-tremblant.svg';
  if (text.includes('kyalami')) return '/track_svgs/kyalami.svg';
  if (text.includes('prince george') || text.includes('east london')) return '/track_svgs/prince-george.svg';
  if (text.includes('buenos aires') || text.includes('galvez') || text.includes('argentin')) return '/track_svgs/buenos-aires.svg';
  if (text.includes('jacarepagua') || text.includes('nelson piquet')) return '/track_svgs/jacarepagua.svg';
  if (text.includes('anderstorp') || text.includes('scandinavian raceway') || text.includes('sweden')) return '/track_svgs/anderstorp.svg';
  if (text.includes('zeltweg')) return '/track_svgs/zeltweg.svg';
  if (text.includes('bremgarten') || text.includes('bern') || text.includes('swiss')) return '/track_svgs/bremgarten.svg';
  if (text.includes('pescara')) return '/track_svgs/pescara.svg';
  if (text.includes('montjuic')) return '/track_svgs/montjuic.svg';
  if (text.includes('pedralbes')) return '/track_svgs/pedralbes.svg';
  if (text.includes('monsanto') || text.includes('lisbon')) return '/track_svgs/monsanto.svg';
  if (text.includes('boavista') || text.includes('porto')) return '/track_svgs/boavista.svg';
  if (text.includes('avus') || text.includes('berlin')) return '/track_svgs/avus.svg';
  if (text.includes('ain-diab') || text.includes('ain diab') || text.includes('casablanca') || text.includes('morocco')) return '/track_svgs/ain-diab.svg';
  if (text.includes('aida') || text.includes('okayama') || text.includes('ti circuit')) return '/track_svgs/aida.svg';

  // Fallback to generic F1 track outline
  return '/track_svgs/f1-generic.svg';
}
