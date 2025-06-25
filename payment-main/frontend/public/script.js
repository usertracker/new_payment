// Tourism packages data
const tourismPackages = [
    {
        id: 1,
        name: "Temple Heritage Tour",
        price: 4500,
        duration: "2 Days",
        image: "https://images.unsplash.com/photo-1621437667155-6f77f90fd752",
        description: "Explore ancient temples and spiritual heritage of Nagapattinam",
        highlights: ["Nagore Dargah", "Ancient Temples", "Cultural Sites", "Local Guide"]
    },
    {
        id: 2,
        name: "Beach and Coastal Retreat",
        price: 3500,
        duration: "1 Day",
        image: "https://images.unsplash.com/photo-1646151732626-1771afd880f4",
        description: "Relax and rejuvenate at pristine beaches and coastal areas",
        highlights: ["Beach Activities", "Coastal Views", "Sunset Points", "Local Seafood"]
    },
    {
        id: 3,
        name: "Eco-Tourism Adventure",
        price: 5500,
        duration: "3 Days",
        image: "https://images.pexels.com/photos/2111253/pexels-photo-2111253.jpeg",
        description: "Experience nature and wildlife in eco-friendly environment",
        highlights: ["Nature Walks", "Bird Watching", "Eco Resort", "Organic Farming"]
    },
    {
        id: 4,
        name: "Cultural Immersion Package",
        price: 6000,
        duration: "4 Days",
        image: "https://images.pexels.com/photos/32696006/pexels-photo-32696006.jpeg",
        description: "Deep dive into local culture, traditions and lifestyle",
        highlights: ["Traditional Arts", "Local Festivals", "Village Stay", "Cultural Shows"]
    },
    {
        id: 5,
        name: "Family Fun Tour",
        price: 4000,
        duration: "2 Days",
        image: "https://images.pexels.com/photos/3126568/pexels-photo-3126568.jpeg",
        description: "Perfect family getaway with activities for all ages",
        highlights: ["Family Activities", "Kids Zone", "Group Games", "Photography"]
    },
    {
        id: 6,
        name: "Nagore Dargah Special",
        price: 2500,
        duration: "1 Day",
        image: "https://images.pexels.com/photos/15828309/pexels-photo-15828309.jpeg",
        description: "Sacred pilgrimage to the famous Nagore Dargah",
        highlights: ["Nagore Dargah", "Prayer Sessions", "Historical Tour", "Spiritual Guide"]
    }
];

// Transport options
const transportOptions = {
    none: { name: "No Transport", price: 0 },
    car: { name: "Private Car (4+1)", price: 2000 },
    suv: { name: "SUV (7+1)", price: 3000 },
    bus: { name: "Mini Bus (18+1)", price: 4000 }
};

// Accommodation types
const accommodationTypes = {
    standard: { name: "Standard Room", price: 0 },
    deluxe: { name: "Deluxe Room", price: 1500 },
    suite: { name: "Suite Room", price: 3000 }
};

// Additional services
const additionalServices = {
    guide: { name: "Professional Tour Guide", price: 800 },
    photography: { name: "Photography Service", price: 1200 },
    meals: { name: "All Meals Included", price: 1000 },
    insurance: { name: "Travel Insurance", price: 500 }
};

// Initialize the main page
function initMainPage() {
    const packagesGrid = document.getElementById('packagesGrid');
    if (!packagesGrid) return;

    packagesGrid.innerHTML = '';
    
    tourismPackages.forEach(package => {
        const packageCard = createPackageCard(package);
        packagesGrid.appendChild(packageCard);
    });
}

// Create package card
function createPackageCard(package) {
    const card = document.createElement('div');
    card.className = 'package-card';
    card.onclick = () => bookPackage(package);
    
    card.innerHTML = `
        <div class="package-image">
            <img src="${package.image}" alt="${package.name}" loading="lazy">
            <div class="package-overlay"></div>
            <div class="package-duration">${package.duration}</div>
            <div class="package-price">₹${package.price}</div>
        </div>
        <div class="package-content">
            <h3 class="package-title">${package.name}</h3>
            <p class="package-description">${package.description}</p>
            <div class="package-highlights">
                <p class="highlights-label">Package Highlights:</p>
                <div class="highlights-tags">
                    ${package.highlights.map(highlight => `<span class="highlight-tag">${highlight}</span>`).join('')}
                </div>
            </div>
            <button class="book-button" onclick="event.stopPropagation(); bookPackage(${JSON.stringify(package).replace(/"/g, '&quot;')})">
                Book Now
            </button>
        </div>
    `;
    
    return card;
}

// Book package function
function bookPackage(package) {
    // Store selected package in localStorage
    localStorage.setItem('selectedPackage', JSON.stringify(package));
    // Navigate to payment page
    window.location.href = 'payment.html';
}

// Initialize payment page
function initPaymentPage() {
    if (!document.getElementById('bookingForm')) return;

    // Load selected package from localStorage
    const selectedPackage = JSON.parse(localStorage.getItem('selectedPackage') || 'null');
    
    // Populate package selection dropdown
    const packageSelect = document.getElementById('selectedPackage');
    tourismPackages.forEach(package => {
        const option = document.createElement('option');
        option.value = package.id;
        option.textContent = `${package.name} (${package.duration}) - ₹${package.price}`;
        if (selectedPackage && selectedPackage.id === package.id) {
            option.selected = true;
        }
        packageSelect.appendChild(option);
    });

    // Set minimum date to today
    const travelDate = document.getElementById('travelDate');
    const today = new Date().toISOString().split('T')[0];
    travelDate.min = today;

    // Add event listeners
    addPaymentEventListeners();
    
    // Initial calculation
    updatePaymentSummary();
    updateSelectedPackageInfo();
}

// Add event listeners for payment page
function addPaymentEventListeners() {
    // Package selection change
    document.getElementById('selectedPackage').onchange = () => {
        updatePaymentSummary();
        updateSelectedPackageInfo();
    };

    // Number of people change
    document.getElementById('numberOfPeople').oninput = () => {
        updatePaymentSummary();
        toggleSecondTraveler();
    };

    // Transport options change
    document.querySelectorAll('input[name="transport"]').forEach(radio => {
        radio.onchange = updatePaymentSummary;
    });

    // Accommodation type change
    document.querySelectorAll('input[name="accommodation"]').forEach(radio => {
        radio.onchange = updatePaymentSummary;
    });

    // Additional services change
    document.querySelectorAll('input[name="services"]').forEach(checkbox => {
        checkbox.onchange = updatePaymentSummary;
    });
}

// Toggle second traveler section
function toggleSecondTraveler() {
    const numberOfPeople = parseInt(document.getElementById('numberOfPeople').value);
    const secondTravelerSection = document.getElementById('secondTravelerSection');
    
    if (numberOfPeople > 1) {
        secondTravelerSection.style.display = 'block';
        // Make second traveler fields required
        document.getElementById('secondFirstName').required = true;
        document.getElementById('secondLastName').required = true;
        document.getElementById('secondDob').required = true;
    } else {
        secondTravelerSection.style.display = 'none';
        // Remove required attribute
        document.getElementById('secondFirstName').required = false;
        document.getElementById('secondLastName').required = false;
        document.getElementById('secondDob').required = false;
    }
}

// Update selected package info
function updateSelectedPackageInfo() {
    const selectedPackageId = parseInt(document.getElementById('selectedPackage').value);
    const package = tourismPackages.find(p => p.id === selectedPackageId);
    
    if (package) {
        document.getElementById('selectedPackageInfo').innerHTML = `
            <h4>${package.name}</h4>
            <p>${package.duration}</p>
        `;
    }
}

// Update payment summary
function updatePaymentSummary() {
    const selectedPackageId = parseInt(document.getElementById('selectedPackage').value);
    const numberOfPeople = parseInt(document.getElementById('numberOfPeople').value) || 1;
    const transportType = document.querySelector('input[name="transport"]:checked').value;
    const accommodationType = document.querySelector('input[name="accommodation"]:checked').value;
    const selectedServices = Array.from(document.querySelectorAll('input[name="services"]:checked')).map(cb => cb.value);

    // Get selected package
    const package = tourismPackages.find(p => p.id === selectedPackageId);
    if (!package) return;

    // Calculate costs
    const packageCost = package.price * numberOfPeople;
    const transportCost = transportOptions[transportType].price;
    const accommodationCost = accommodationTypes[accommodationType].price * numberOfPeople;
    const servicesCost = selectedServices.reduce((total, serviceId) => {
        return total + (additionalServices[serviceId]?.price || 0);
    }, 0);

    const totalAmount = packageCost + transportCost + accommodationCost + servicesCost;

    // Update summary details
    const summaryDetails = document.getElementById('summaryDetails');
    let summaryHTML = `
        <div class="summary-item">
            <span>Package Price</span>
            <span>₹${package.price}</span>
        </div>
        <div class="summary-item">
            <span>People (${numberOfPeople})</span>
            <span>×${numberOfPeople}</span>
        </div>
    `;

    if (transportType !== 'none') {
        summaryHTML += `
            <div class="summary-item">
                <span>Transport</span>
                <span>₹${transportCost}</span>
            </div>
        `;
    }

    if (accommodationType !== 'standard') {
        summaryHTML += `
            <div class="summary-item">
                <span>Accommodation Upgrade</span>
                <span>₹${accommodationCost}</span>
            </div>
        `;
    }

    selectedServices.forEach(serviceId => {
        const service = additionalServices[serviceId];
        if (service) {
            summaryHTML += `
                <div class="summary-item">
                    <span>${service.name}</span>
                    <span>₹${service.price}</span>
                </div>
            `;
        }
    });

    summaryDetails.innerHTML = summaryHTML;

    // Update total amount
    document.getElementById('totalAmount').textContent = `₹${totalAmount}`;
    document.getElementById('payButtonText').textContent = `Pay Now ₹${totalAmount}`;
}

// Proceed to payment
function proceedToPayment() {
    const form = document.getElementById('bookingForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    // Update progress
    updateProgress(2);

    // Get selected payment method
    const selectedPaymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    
    // Show payment modal based on method
    showPaymentModal(selectedPaymentMethod);
}

// Update progress indicator
function updateProgress(step) {
    document.querySelectorAll('.progress-step').forEach((stepEl, index) => {
        if (index < step) {
            stepEl.classList.add('active');
        } else {
            stepEl.classList.remove('active');
        }
    });
}

// Show payment modal
function showPaymentModal(paymentMethod) {
    const modal = document.getElementById('paymentModal');
    const modalTitle = document.getElementById('paymentModalTitle');
    const modalBody = document.getElementById('paymentModalBody');
    
    let title = '';
    let content = '';
    
    switch(paymentMethod) {
        case 'card':
            title = 'Credit/Debit Card Payment';
            content = createCardForm();
            break;
        case 'paypal':
            title = 'PayPal Payment';
            content = createPayPalForm();
            break;
        case 'bank':
            title = 'Bank Transfer';
            content = createBankForm();
            break;
    }
    
    modalTitle.textContent = title;
    modalBody.innerHTML = content;
    modal.classList.add('show');
}

// Create card payment form
function createCardForm() {
    return `
        <div class="payment-form">
            <div class="form-group">
                <label class="form-label">Card Number *</label>
                <input type="text" class="payment-form-input" placeholder="1234 5678 9012 3456" maxlength="19" required>
            </div>
            <div class="form-group">
                <label class="form-label">Cardholder Name *</label>
                <input type="text" class="payment-form-input" placeholder="John Doe" required>
            </div>
            <div class="card-input-group">
                <div class="form-group">
                    <label class="form-label">Expiry Date *</label>
                    <input type="text" class="payment-form-input" placeholder="MM/YY" maxlength="5" required>
                </div>
                <div class="form-group">
                    <label class="form-label">CVV *</label>
                    <input type="text" class="payment-form-input" placeholder="123" maxlength="3" required>
                </div>
            </div>
            <button class="confirm-payment-btn" onclick="processPayment('card')">
                <i class="fas fa-lock"></i>
                Confirm Payment
            </button>
        </div>
    `;
}

// Create PayPal form
function createPayPalForm() {
    return `
        <div class="payment-form">
            <div class="paypal-info">
                <div style="text-align: center; padding: 2rem;">
                    <img src="https://img.icons8.com/color/64/000000/paypal.png" alt="PayPal" style="margin-bottom: 1rem;">
                    <p style="color: #6b7280; margin-bottom: 1.5rem;">You will be redirected to PayPal to complete your payment securely.</p>
                </div>
            </div>
            <button class="confirm-payment-btn" onclick="processPayment('paypal')">
                <i class="fab fa-paypal"></i>
                Continue with PayPal
            </button>
        </div>
    `;
}

// Create bank transfer form
function createBankForm() {
    return `
        <div class="payment-form">
            <div class="bank-info">
                <h3 style="margin-bottom: 1rem; color: #1f2937;">Bank Transfer Details</h3>
                <div style="background: #f8fafc; padding: 1rem; border-radius: 0.5rem; margin-bottom: 1rem;">
                    <p><strong>Bank Name:</strong> State Bank of India</p>
                    <p><strong>Account Name:</strong> Nagai Tourism</p>
                    <p><strong>Account Number:</strong> 1234567890</p>
                    <p><strong>IFSC Code:</strong> SBIN0001234</p>
                    <p><strong>Branch:</strong> Nagapattinam Main Branch</p>
                </div>
                <p style="color: #6b7280; font-size: 0.875rem; margin-bottom: 1rem;">
                    Please transfer the amount and upload the transaction receipt below.
                </p>
            </div>
            <div class="form-group">
                <label class="form-label">Transaction Reference Number *</label>
                <input type="text" class="payment-form-input" placeholder="Enter transaction reference" required>
            </div>
            <div class="form-group">
                <label class="form-label">Upload Receipt</label>
                <input type="file" class="payment-form-input" accept=".jpg,.jpeg,.png,.pdf">
            </div>
            <button class="confirm-payment-btn" onclick="processPayment('bank')">
                <i class="fas fa-university"></i>
                Confirm Transfer
            </button>
        </div>
    `;
}

// Process payment
function processPayment(method) {
    const confirmBtn = document.querySelector('.confirm-payment-btn');
    confirmBtn.disabled = true;
    confirmBtn.innerHTML = `
        <div style="display: flex; align-items: center; justify-content: center;">
            <div style="width: 1rem; height: 1rem; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin-right: 0.5rem;"></div>
            Processing...
        </div>
    `;

    // Simulate payment processing
    setTimeout(() => {
        closePaymentModal();
        updateProgress(3);
        showSuccessModal();
    }, 3000);
}

// Close payment modal
function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    modal.classList.remove('show');
}

// Show success modal
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    
    // Generate booking ID
    const bookingId = 'NGT' + new Date().getFullYear() + Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    document.getElementById('bookingId').textContent = bookingId;
    
    modal.classList.add('show');
}

// Download receipt
function downloadReceipt() {
    const bookingId = document.getElementById('bookingId').textContent;
    const selectedPackageId = parseInt(document.getElementById('selectedPackage')?.value || 1);
    const package = tourismPackages.find(p => p.id === selectedPackageId);
    const totalAmount = document.getElementById('totalAmount')?.textContent || '₹4500';
    
    // Create receipt content
    const receiptContent = `
NAGAI TOURISM - BOOKING RECEIPT
================================

Booking ID: ${bookingId}
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

PACKAGE DETAILS:
Package: ${package?.name || 'Tourism Package'}
Duration: ${package?.duration || '1 Day'}
Base Price: ₹${package?.price || 4500}

CUSTOMER DETAILS:
Name: ${document.getElementById('primaryFirstName')?.value || ''} ${document.getElementById('primaryLastName')?.value || ''}
Email: ${document.getElementById('primaryEmail')?.value || ''}
Phone: ${document.getElementById('primaryPhone')?.value || ''}

BOOKING SUMMARY:
Total Amount: ${totalAmount}
Payment Status: CONFIRMED
Payment Method: ${getSelectedPaymentMethod()}

TRAVEL DETAILS:
Travel Date: ${document.getElementById('travelDate')?.value || ''}
Number of People: ${document.getElementById('numberOfPeople')?.value || 1}

CONTACT INFORMATION:
Nagai Tourism
Phone: +91 98765 43210
Email: info@nagaitourism.com
Website: www.nagaitourism.com

Thank you for choosing Nagai Tourism!
Your adventure awaits in Nagapattinam.

Terms & Conditions Apply
================================
    `;
    
    // Create and download the receipt
    const blob = new Blob([receiptContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Nagai_Tourism_Receipt_${bookingId}.txt`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    // Show download success message
    setTimeout(() => {
        alert('Receipt downloaded successfully! Check your Downloads folder.');
    }, 500);
}

// Get selected payment method for receipt
function getSelectedPaymentMethod() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked')?.value;
    switch(paymentMethod) {
        case 'card': return 'Credit/Debit Card';
        case 'paypal': return 'PayPal';
        case 'bank': return 'Bank Transfer';
        default: return 'Credit/Debit Card';
    }
}

// Go to home
function goHome() {
    window.location.href = 'index.html';
}

// Go back function
function goBack() {
    window.location.href = 'index.html';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const successModal = document.getElementById('successModal');
    
    if (event.target === paymentModal) {
        closePaymentModal();
    }
    if (event.target === successModal) {
        goHome();
    }
}

// Initialize based on current page
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the main page or payment page
    if (document.getElementById('packagesGrid')) {
        initMainPage();
    } else if (document.getElementById('bookingForm')) {
        initPaymentPage();
    }
});

// Handle window resize for responsive design
window.addEventListener('resize', function() {
    // Any resize-specific logic can go here
});

// Format card number input
document.addEventListener('input', function(e) {
    if (e.target.placeholder === '1234 5678 9012 3456') {
        let value = e.target.value.replace(/\s/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    }
    
    if (e.target.placeholder === 'MM/YY') {
        let value = e.target.value.replace(/\D/g, '');
        let formattedValue = value.match(/.{1,2}/g)?.join('/') || value;
        e.target.value = formattedValue;
    }
});