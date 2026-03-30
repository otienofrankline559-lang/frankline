// Supabase Configuration
const supabaseUrl = "https://fbnefunpnqinpmywhifc.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZibmVmdW5wbnFpbnBteXdoaWZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4ODEwNzIsImV4cCI6MjA5MDQ1NzA3Mn0.xVq_FGhxCTZ2IIxHVD-ccKs14vGlPnoU1nhxkKWmiBY";

// Initialize Supabase Client
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// Form Elements
const contactForm = document.querySelector(".contact-form");
const messageBox = document.querySelector(".form-message");

// Form Submission Handler
if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault(); // Prevent page refresh

        const button = contactForm.querySelector("button");
        const originalButtonText = button.textContent;

        // Update UI state with animation
        button.textContent = "Sending...";
        button.disabled = true;
        button.style.opacity = "0.7";

        // Get form data
        const name = contactForm.querySelector("input[type='text']").value;
        const phone = contactForm.querySelector("input[type='tel']").value;
        const email = contactForm.querySelector("input[type='email']").value;
        const message = contactForm.querySelector("textarea").value;

        try {
            // Insert data into Supabase 'messages' table
            const { error } = await supabase
                .from("messages")
                .insert([{ name, phone, email, message }]);

            if (error) {
                throw error;
            }

            // Success handling with animation
            messageBox.textContent = "✅ Message sent successfully!";
            messageBox.style.color = "green";
            messageBox.style.animation = "slideUp 0.4s ease-out";
            
            // Reset form with slight delay for visual effect
            setTimeout(() => {
                contactForm.reset();
            }, 500);

        } catch (error) {
            // Error handling with animation
            console.error("Supabase Error:", error.message);
            messageBox.textContent = "❌ Failed to send message. Please try again.";
            messageBox.style.color = "red";
            messageBox.style.animation = "slideUp 0.4s ease-out";
        } finally {
            // Reset button state
            button.textContent = originalButtonText;
            button.disabled = false;
            button.style.opacity = "1";
        }
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animation for elements
window.addEventListener('scroll', () => {
    const elements = document.querySelectorAll('[data-aos]');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
            el.classList.add('aos-animate');
        }
    });
});
