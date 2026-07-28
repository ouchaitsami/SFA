@@ .. @@
           {/* Logo principal 400x400 */}
           <svg id="mainLogo" width="400" height="400" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
             {/* Fond dégradé */}
             <defs>
              <radialGradient id="bgGradient" cx="50%" cy="50%" r="80%">
                <stop offset="0%" style={{stopColor:'#ffffff', stopOpacity:1}} />
                <stop offset="70%" style={{stopColor:'#f0fdf4', stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#e6fffa', stopOpacity:1}} />
              </radialGradient>
              <linearGradient id="cocktailGradient" x1="0%" y1="100%" x2="0%" y2="0%">
                <stop offset="0%" style={{stopColor:'#10B981'}} />
                <stop offset="30%" style={{stopColor:'#34D399'}} />
                <stop offset="70%" style={{stopColor:'#F472B6'}} />
                <stop offset="100%" style={{stopColor:'#EC4899'}} />
              </linearGradient>
              <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'#059669'}} />
                <stop offset="100%" style={{stopColor:'#BE185D'}} />
              </linearGradient>
              <linearGradient id="accentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{stopColor:'#10B981'}} />
                <stop offset="100%" style={{stopColor:'#EC4899'}} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge> 
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Cercle de fond */}
            <circle cx="200" cy="200" r="200" fill="url(#bgGradient)" />
            
            {/* Bordure élégante */}
            <circle cx="200" cy="200" r="195" fill="none" stroke="url(#accentGradient)" strokeWidth="3" opacity="0.4" />
            
            {/* Verre à cocktail moderne */}
            {/* Base du verre */}
            <ellipse cx="200" cy="320" rx="25" ry="8" fill="#374151" opacity="0.8" />
            
            {/* Pied du verre */}
            <rect x="198" y="300" width="4" height="20" fill="#374151" />
            
            {/* Corps du verre (forme triangulaire moderne) */}
            <path d="M160 300 L240 300 L220 180 L180 180 Z" fill="none" stroke="#374151" strokeWidth="3" />
            
            {/* Liquide cocktail avec dégradé */}
            <path d="M162 298 L238 298 L219 185 L181 185 Z" fill="url(#cocktailGradient)" opacity="0.9" />
            
            {/* Reflet sur le verre */}
            <path d="M170 290 L175 290 L172 200 L170 200 Z" fill="#ffffff" opacity="0.3" />
            
            {/* Bulles dans le cocktail */}
            <circle cx="190" cy="250" r="3" fill="#ffffff" opacity="0.7" />
            <circle cx="210" cy="230" r="2" fill="#ffffff" opacity="0.8" />
            <circle cx="205" cy="270" r="2.5" fill="#ffffff" opacity="0.6" />
            <circle cx="185" cy="220" r="1.5" fill="#ffffff" opacity="0.9" />
            <circle cx="215" cy="260" r="2" fill="#ffffff" opacity="0.7" />
            
            {/* Bulles qui s'échappent */}
            <circle cx="200" cy="170" r="4" fill="#10B981" opacity="0.5" />
            <circle cx="190" cy="160" r="3" fill="#EC4899" opacity="0.6" />
            <circle cx="210" cy="155" r="2.5" fill="#10B981" opacity="0.4" />
            <circle cx="205" cy="145" r="2" fill="#EC4899" opacity="0.5" />
            
            {/* Éclats de fraîcheur autour */}
            <path d="M120 200 L130 195 L125 205 Z" fill="#10B981" opacity="0.6" />
            <path d="M280 200 L270 195 L275 205 Z" fill="#EC4899" opacity="0.6" />
            <path d="M200 80 L195 90 L205 85 Z" fill="#10B981" opacity="0.5" />
            <path d="M200 320 L195 310 L205 315 Z" fill="#EC4899" opacity="0.5" />
            
            {/* Texte "So Fresh" en arc au-dessus */}
            <path id="topArc" d="M 100 200 A 100 100 0 0 1 300 200" fill="none" />
            <text fontFamily="Arial, sans-serif" fontSize="24" fontWeight="700" fill="url(#textGradient)">
              <textPath href="#topArc" startOffset="50%" textAnchor="middle">So Fresh</textPath>
            </text>
            
            {/* Texte "Ads" en bas */}
            <text x="200" y="360" textAnchor="middle" fontFamily="Arial, sans-serif" fontSize="28" fontWeight="700" fill="url(#textGradient)">Ads</text>
            
            {/* Petite cerise ou olive décorative */}
            <circle cx="220" cy="185" r="4" fill="#DC2626" />
            <path d="M220 181 Q225 175 230 180" stroke="#059669" strokeWidth="2" fill="none" />
          </svg>

        <div className="instructions">
          <h3>🚀 Comment utiliser votre photo de profil :</h3>
          <div style={{textAlign: 'left'}}>
            <h4>📱 Instagram Business :</h4>
            <ol>
              <li>Téléchargez le fichier PNG HD (1000px)</li>
              <li>Allez dans votre profil Instagram</li>
              <li>Cliquez sur "Modifier le profil"</li>
              <li>Cliquez sur votre photo actuelle</li>
              <li>Sélectionnez le fichier téléchargé</li>
            </ol>
            
            <h4>💼 LinkedIn :</h4>
            <ol>
              <li>Utilisez le même fichier PNG HD</li>
              <li>Allez sur votre page LinkedIn</li>
              <li>Cliquez sur l'icône appareil photo</li>
              <li>Téléchargez votre nouvelle photo</li>
              <li>Ajustez le cadrage si nécessaire</li>
            </ol>
            
            <h4>✨ Conseils :</h4>
            <ul>
              <li>🍹 Le cocktail reste visible même en très petit format</li>
              <li>🎨 Les couleurs correspondent à votre site web</li>
              <li>📱 Optimisé pour tous les écrans</li>
              <li>🏆 Design unique qui reflète votre marque "fraîcheur"</li>
              <li>💫 Les bulles ajoutent un effet dynamique</li>
            </ul>
          </div>
        </div>