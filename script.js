document.addEventListener('DOMContentLoaded', () => {
            const postInput = document.getElementById('postInput');
            const addPostBtn = document.getElementById('addPostBtn');
            const postsContainer = document.getElementById('postsContainer');

            // Add new post
            addPostBtn.addEventListener('click', createPostFromInput);
            
            // Allow posting with Enter key (but allow Shift+Enter for new lines)
            postInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    createPostFromInput();
                }
            });

            function createPostFromInput() {
                const postText = postInput.value.trim();
                if (postText) {
                    createPost(postText);
                    postInput.value = '';
                }
            }

            // Create a post element
            function createPost(text) {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                
                const postContent = document.createElement('div');
                postContent.className = 'post-content';
                postContent.textContent = text;
                
                const postFooter = document.createElement('div');
                postFooter.className = 'post-footer';
                
                const likeBtn = document.createElement('button');
                likeBtn.className = 'like-btn';
                likeBtn.innerHTML = '❤️ Like';
                
                const timeStamp = document.createElement('span');
                timeStamp.textContent = new Date().toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                });
                
                let isLiked = false;
                
                // Like/unlike functionality
                likeBtn.addEventListener('click', () => {
                    isLiked = !isLiked;
                    if (isLiked) {
                        likeBtn.classList.add('liked');
                        likeBtn.innerHTML = '❤️ Liked';
                    } else {
                        likeBtn.classList.remove('liked');
                        likeBtn.innerHTML = '❤️ Like';
                    }
                });
                
                postFooter.appendChild(likeBtn);
                postFooter.appendChild(timeStamp);
                
                postDiv.appendChild(postContent);
                postDiv.appendChild(postFooter);
                
                postsContainer.prepend(postDiv); // Add to top of feed
            }

            // Add some sample posts on load
            const samplePosts = [
                "Just enjoying a beautiful day! ☀️",
                "Working on a new project - excited to share soon!",
                "What's everyone up to this weekend?"
            ];
            
            // Add sample posts with slight delay to simulate loading
            setTimeout(() => {
                samplePosts.forEach((post, index) => {
                    setTimeout(() => {
                        createPost(post);
                    }, index * 300);
                });
            }, 500);
        });
