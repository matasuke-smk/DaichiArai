document.addEventListener('DOMContentLoaded', function() {
    // モーダル関連の要素を取得
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('fullImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const closeButton = document.querySelector('.close-button');

    // フィルターボタン関連
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryGridItems = document.querySelectorAll('.gallery-grid .gallery-item');

    // 各ギャラリー画像にクリックイベントを設定
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            modal.style.display = "block";
            modalImg.src = this.dataset.full || this.src;
            modalTitle.textContent = this.alt; // altテキストをタイトルとして表示
            modalDescription.textContent = this.dataset.description || ''; // data-descriptionを詳細として表示
        });
    });


    // 閉じるボタンのイベント
    if (closeButton) {
        closeButton.addEventListener('click', function() {
            modal.style.display = "none";
        });
    }

    // モーダル背景クリックで閉じるイベント
    window.addEventListener('click', function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    });

    // キーボードのEscapeキーでモーダルを閉じる
    document.addEventListener('keydown', function(event) {
        if (event.key === "Escape" && modal.style.display === "block") {
            modal.style.display = "none";
        }
    });

    // ナビゲーションリンクのスムーズスクロール
    document.querySelectorAll('header nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ギャラリーフィルタリング
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // アクティブなボタンのスタイル変更
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.dataset.filter;

            galleryGridItems.forEach(item => {
                const itemCategory = item.querySelector('img').dataset.category;
                if (filterValue === 'all' || itemCategory === filterValue) {
                    // 表示するアイテム
                    item.classList.remove('hide');
                    // アニメーションのために少し遅延させて表示
                    setTimeout(() => { item.style.display = 'block'; }, 0);
                } else {
                    // 非表示にするアイテム
                    item.classList.add('hide');
                    // アニメーション完了後にdisplay:noneを設定
                    setTimeout(() => { item.style.display = 'none'; }, 500); // CSSのtransition時間と合わせる
                }
            });
        });
    });

});
