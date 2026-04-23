import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import SEO from '@/components/SEO';
import { useCart } from '../context/CartContext';
import {
  Heart,
  ChevronRight,
  Truck,
  ShieldCheck,
  Plus,
  Minus,
  ShoppingCart,
  CheckCircle2,
  Share2,
  Star,
  Info,
  Clock,
  Zap,
  RotateCcw,
  BadgeCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import API_BASE_URL from '../config';

export default function ProductDetail() {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [isAdded, setIsAdded] = useState(false);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const [images, setImages] = useState([]);
  const [mainImage, setMainImage] = useState('/logo/fabicon.png');
  const [zoomStyle, setZoomStyle] = useState({ display: 'none' });
  const [zoomBgPos, setZoomBgPos] = useState('0% 0%');

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.pageX - left - window.scrollX) / width) * 100;
    const y = ((e.pageY - top - window.scrollY) / height) * 100;
    setZoomBgPos(`${x}% ${y}%`);
    setZoomStyle({ display: 'block' });
  };

  const handleMouseLeave = () => {
    setZoomStyle({ display: 'none' });
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/checkout');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        url: window.location.href,
      }).catch(() => { });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);

    fetch(`${API_BASE_URL}/products/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 'success') {
          setProduct(data.data);
          const productImages = getImages(data.data.images);
          setImages(productImages);
          setMainImage(productImages.length > 0 ? productImages[0] : '/logo/fabicon.png');

          const categories = data.data.categories || [];
          const categorySlug = categories.length > 0 ? categories[0].slug : '';

          let fetchUrl = `${API_BASE_URL}/products?limit=12`;
          if (categorySlug) fetchUrl += `&category=${categorySlug}`;

          fetch(fetchUrl)
            .then((res) => res.json())
            .then((relData) => {
              if (relData.status === 'success') {
                setRelatedProducts(relData.data.filter((p) => p.id !== data.data.id).slice(0, 6));
              }
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const getImages = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      return Array.isArray(imgs) ? imgs.map((img) => `/${img.replace(/\\/g, '/')}`) : [];
    } catch { return []; }
  };

  const getImagePath = (images) => {
    try {
      const imgs = typeof images === 'string' ? JSON.parse(images) : images;
      if (Array.isArray(imgs) && imgs.length > 0) return `/${imgs[0].replace(/\\/g, '/')}`;
    } catch { }
    return '/logo/fabicon.png';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="w-10 h-10 border-4 border-gray-200 border-t-primary rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
        <Link to="/shop" className="text-primary font-bold hover:underline">Return to Shop Catalog</Link>
      </div>
    );
  }

  const discount = product.old_price ? Math.round(((product.old_price - product.price) / product.old_price) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F8F9FA] font-['Rubik'] text-[#0f1111] pb-20">
      <SEO title={product.name} />

      {/* --- BREADCRUMBS --- */}
      <div className="bg-white border-b border-gray-200 py-3 shadow-sm">
        <div className="max-w-[1500px] mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-1 text-[12px] text-[#565959]">
            <Link to="/" className="hover:underline hover:text-[#c45500]">Home</Link>
            <ChevronRight size={12} className="mx-1 opacity-50" />
            <Link to="/shop" className="hover:underline hover:text-[#c45500]">Shop</Link>
            <ChevronRight size={12} className="mx-1 opacity-50" />
            <span className="text-[#0f1111] font-bold truncate max-w-[200px] md:max-w-none">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-[1500px] mx-auto px-4 md:px-8 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

          {/* --- LEFT: IMAGE GALLERY (Sticky on desktop) --- */}
          <div className="lg:col-span-5 xl:col-span-6 space-y-6 lg:sticky lg:top-24 z-40">
            <div className="flex flex-col-reverse md:flex-row gap-4">
              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto no-scrollbar max-h-[500px]">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onMouseEnter={() => { setActiveImage(idx); setMainImage(img); }}
                      onClick={() => { setActiveImage(idx); setMainImage(img); }}
                      className={`w-16 h-16 md:w-20 md:h-20 rounded-md border-2 p-1 bg-white shrink-0 transition-all ${activeImage === idx ? 'border-[#e77600] shadow-md shadow-orange-100' : 'border-gray-200 hover:border-[#e77600]'}`}
                    >
                      <img src={img} alt="" className="w-full h-full object-contain mix-blend-multiply" />
                    </button>
                  ))}
                </div>
              )}

              {/* Main Image with Zoom */}
              <div
                className="flex-1 aspect-square bg-white border border-gray-300 rounded-lg relative flex items-center justify-center p-8 group cursor-crosshair"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
              >
                <motion.img
                  key={activeImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  src={mainImage}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain mix-blend-multiply"
                />

                {/* Zoom Window (Amazon Style) */}
                <div
                  className="hidden lg:block absolute left-full top-0 ml-4 w-[500px] h-[500px] bg-white border border-gray-300 shadow-2xl z-[100] pointer-events-none rounded-lg overflow-hidden"
                  style={{
                    ...zoomStyle,
                    backgroundImage: `url(${mainImage})`,
                    backgroundPosition: zoomBgPos,
                    backgroundSize: '300%',
                    backgroundRepeat: 'no-repeat'
                  }}
                />

                {/* Overlay Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 pointer-events-none">
                  {discount > 0 && (
                    <div className="bg-[#cc0c39] text-white text-[12px] font-bold px-3 py-1 rounded-sm shadow-sm">
                      -{discount}% Off
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleWishlist(product)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white border border-gray-200 shadow-sm flex items-center justify-center text-gray-400 hover:text-[#cc0c39] hover:bg-gray-50 transition-all z-10"
                >
                  <Heart size={20} fill={isInWishlist(product.id) ? '#cc0c39' : 'none'} className={isInWishlist(product.id) ? 'text-[#cc0c39]' : ''} />
                </button>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                  <Truck size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900">Free Delivery</span>
                  <span className="text-[10px] text-gray-500 font-medium">Over nationwide shipping</span>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-white border border-gray-200 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-gray-500">
                  <RotateCcw size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-[12px] font-bold text-gray-900">7 Days Return</span>
                  <span className="text-[10px] text-gray-500 font-medium">Easy replacement policy</span>
                </div>
              </div>
            </div>
          </div>

          {/* --- RIGHT: PRODUCT INFO --- */}
          <div className="lg:col-span-7 xl:col-span-6 space-y-8">
            <div className="bg-white p-6 md:p-8 border border-gray-300 rounded-lg shadow-sm">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#007185] uppercase tracking-wider">
                    Exclusive Collection
                  </span>
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-1 text-gray-400 hover:text-gray-900 transition-colors cursor-pointer"
                  >
                    <Share2 size={18} />
                  </button>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold leading-tight text-[#0f1111] border-b border-gray-100 pb-4">
                  {product.name}
                </h1>

                <div className="pt-2">
                  <div className="flex items-baseline gap-3">
                    <span className="text-[#cc0c39] text-3xl font-light">-${discount}%</span>
                    <div className="flex items-start">
                      <span className="text-[14px] font-bold mt-1">$</span>
                      <span className="text-4xl font-bold">{Number(product.price).toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="text-[13px] text-gray-500 font-medium mt-1">
                    M.R.P.: <span className="line-through">${product.old_price || (Number(product.price) + 50).toLocaleString()}</span>
                  </div>
                  <div className="text-[13px] text-[#0f1111] font-bold mt-1 flex items-center gap-2">
                    Inclusive of all taxes
                    <div className="group relative">
                      <Info size={14} className="text-gray-400" />
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                        All taxes and fees are included in the final price. No hidden charges.
                      </div>
                    </div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="py-4 border-y border-gray-200 flex items-center gap-6">
                  <div className="flex items-center gap-2">
                    <ShieldCheck size={18} className="text-[#2e7d32]" />
                    <span className="text-[12px] font-bold text-gray-700">Safe Transaction</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={18} className="text-[#007185]" />
                    <span className="text-[12px] font-bold text-gray-700">Secure Delivery</span>
                  </div>
                </div>

                {/* Selection and Actions */}
                <div className="pt-4 space-y-6">
                  <div className="flex items-center gap-4">
                    <span className="text-[14px] font-bold text-gray-900 min-w-[80px]">Quantity:</span>
                    <div className="flex items-center bg-gray-100 rounded-md border border-gray-300 h-9">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-full flex items-center justify-center hover:bg-gray-200 rounded-l-md transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <input
                        type="number"
                        value={quantity}
                        readOnly
                        className="w-10 bg-transparent text-center text-sm font-bold outline-none"
                      />
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-full flex items-center justify-center hover:bg-gray-200 rounded-r-md transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <button
                      onClick={handleAddToCart}
                      className={`h-12 rounded-full font-bold text-[14px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${isAdded ? 'bg-[#0096d6] text-white' : 'bg-[#ffd814] border border-[#fcd200] hover:bg-[#f7ca00] text-[#0f1111]'}`}
                    >
                      <ShoppingCart size={18} />
                      {isAdded ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={handleBuyNow}
                      className="h-12 bg-[#ffa41c] border border-[#ff8f00] hover:bg-[#fa8900] text-[#0f1111] rounded-full font-bold text-[14px] shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Zap size={18} />
                      Buy Now
                    </button>
                  </div>
                </div>

                <div className="pt-6">
                  <h4 className="text-[15px] font-bold mb-4">About this item</h4>
                  <ul className="space-y-2 list-disc pl-5 text-[14px] text-gray-700 leading-relaxed font-normal">
                    {product.description ? (
                      product.description.split('.').map((sentence, idx) => (
                        sentence.trim() && <li key={idx}>{sentence.trim()}</li>
                      ))
                    ) : (
                      <>
                        <li>Premium performance for demanding professional workflows.</li>
                        <li>Seamless connectivity with modern wireless standards.</li>
                        <li>Designed for high-volume efficiency and long-term reliability.</li>
                        <li>Genuine brand product with full manufacturer warranty coverage.</li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>

            {/* Specifications Table */}
            <div className="bg-white p-6 md:p-8 border border-gray-300 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold mb-6 pb-2 border-b border-gray-200">Product Specifications</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <span className="text-[13px] font-bold text-[#565959] w-1/2">Product Dimensions</span>
                  <span className="text-[13px] text-[#0f1111] w-1/2">Standard Workspace Size</span>
                </div>
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <span className="text-[13px] font-bold text-[#565959] w-1/2">Item Weight</span>
                  <span className="text-[13px] text-[#0f1111] w-1/2">Professional Grade</span>
                </div>
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <span className="text-[13px] font-bold text-[#565959] w-1/2">Compatible Devices</span>
                  <span className="text-[13px] text-[#0f1111] w-1/2">Universal OS Support</span>
                </div>
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <span className="text-[13px] font-bold text-[#565959] w-1/2">Connectivity Tech</span>
                  <span className="text-[13px] text-[#0f1111] w-1/2">Wireless/Ethernet</span>
                </div>
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <span className="text-[13px] font-bold text-[#565959] w-1/2">Power Source</span>
                  <span className="text-[13px] text-[#0f1111] w-1/2">AC 100-240V</span>
                </div>
                <div className="flex py-2 border-b border-gray-100 last:border-0">
                  <span className="text-[13px] font-bold text-[#565959] w-1/2">Manufacturer</span>
                  <span className="text-[13px] text-[#0f1111] w-1/2">Genuine Parts</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- RELATED PRODUCTS --- */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 md:mt-24">
            <div className="flex items-center justify-between mb-8 pb-2 border-b border-gray-300">
              <h3 className="text-xl font-bold">Related to items you've viewed</h3>
              <Link to="/shop" className="text-sm font-bold text-[#007185] hover:text-[#c45500] hover:underline">See more</Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
              {relatedProducts.map((p) => (
                <Link to={`/product/${p.slug}`} key={p.id} className="bg-white border border-gray-200 p-4 rounded-lg hover:shadow-lg transition-all group">
                  <div className="aspect-square bg-white flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                    <img src={getImagePath(p.images)} alt="" className="max-w-full max-h-full object-contain mix-blend-multiply" />
                  </div>
                  <h4 className="text-[13px] font-bold text-[#007185] hover:text-[#c45500] line-clamp-2 mb-2 h-10">{p.name}</h4>
                  <p className="text-lg font-bold text-gray-900">${Number(p.price).toLocaleString()}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Sticky Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 p-3 lg:hidden z-50 flex gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
        <button
          onClick={handleAddToCart}
          className={`flex-1 h-11 rounded-md font-bold text-[13px] transition-all flex items-center justify-center gap-2 ${isAdded ? 'bg-[#0096d6] text-white' : 'bg-[#ffd814] border border-[#fcd200] text-[#0f1111]'}`}
        >
          <ShoppingCart size={16} />
          {isAdded ? 'Added' : 'Cart'}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 h-11 bg-[#ffa41c] border border-[#ff8f00] text-[#0f1111] rounded-md font-bold text-[13px] flex items-center justify-center gap-2"
        >
          <Zap size={16} />
          Buy Now
        </button>
      </div>
    </div>
  );
}
