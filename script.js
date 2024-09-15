document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('financial-form');
    const recommendationsDiv = document.getElementById('recommendations');
    const budgetChartCanvas = document.createElement('canvas');
    document.getElementById('budget-chart').appendChild(budgetChartCanvas);
    let budgetChart;

    // Handle Financial Form Submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const income = parseFloat(document.getElementById('income').value);
        const expenses = parseFloat(document.getElementById('expenses').value);
        const savings = parseFloat(document.getElementById('savings').value);
        const debts = parseFloat(document.getElementById('debts').value);
        const investments = parseFloat(document.getElementById('investments').value);
        const ageGroup = document.getElementById('age-group').value;
        const goal = document.getElementById('goal').value;

        // Update Budget Chart
        updateBudgetChart(income, expenses);

        // Update Savings Tracker
        updateSavingsTracker(savings, income - expenses);

        // Generate and display recommendations
        const recommendations = generateRecommendations(income, expenses, savings, debts, investments, ageGroup, goal);
        displayRecommendations(recommendations);
    });

    // Update Budget Chart
    function updateBudgetChart(income, expenses) {
        const ctx = budgetChartCanvas.getContext('2d');
        const savings = income - expenses;

        if (budgetChart) {
            budgetChart.destroy();
        }

        budgetChart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Expenses', 'Savings'],
                datasets: [{
                    data: [expenses, savings],
                    backgroundColor: ['#ff6384', '#36a2eb']
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // Update Savings Tracker
    function updateSavingsTracker(currentSavings, monthlySavings) {
        const savingsProgress = document.getElementById('savings-progress');
        savingsProgress.innerHTML = `
            <p>Current Savings: $${currentSavings.toFixed(2)}</p>
            <p>Monthly Savings: $${monthlySavings.toFixed(2)}</p>
            <p>Projected Savings in 1 Year: $${(currentSavings + monthlySavings * 12).toFixed(2)}</p>
        `;
    }

    // Generate Recommendations
    function generateRecommendations(income, expenses, savings, debts, investments, ageGroup, goal) {
        let recommendations = [];

        if (expenses > income * 0.7) {
            recommendations.push("Your expenses are high relative to your income. Try to reduce non-essential spending.");
        }

        if (debts > 0) {
            recommendations.push("You have outstanding debts. Focus on paying off high-interest debt first.");
        }

        if (savings < income * 3) {
            recommendations.push("Your emergency fund is low. Aim to save at least 3 months of income.");
        }

        switch (goal) {
            case 'emergency-fund':
                recommendations.push("To build your emergency fund faster, consider automating a portion of your paycheck to savings.");
                break;
            case 'debt-payoff':
                recommendations.push("Focus on paying off high-interest debt while maintaining minimum payments on other debts.");
                break;
            case 'retirement':
                recommendations.push("Maximize contributions to tax-advantaged retirement accounts such as 401(k) or IRA.");
                break;
            case 'home-purchase':
                recommendations.push("Consider setting up a separate high-yield savings account for your home down payment.");
                break;
            case 'investment-growth':
                recommendations.push("Look into low-cost index funds or ETFs to diversify your investment portfolio.");
                break;
        }

        return recommendations;
    }

    // Display Recommendations
    function displayRecommendations(recommendations) {
        recommendationsDiv.innerHTML = recommendations.map(rec => `<p>• ${rec}</p>`).join('');
    }

    // Simple Login/Signup Handling (Demo)
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Form submitted successfully!');
        });
    });
});