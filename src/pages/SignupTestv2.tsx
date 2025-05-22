
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";

const SignupTestv2 = () => {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  const closeModal = () => {
    setIsModalOpen(false);
    // Navigate back to homepage when modal is closed
    navigate("/");
  };

  // Add the custom script when the component mounts
  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'module';
    script.innerHTML = `
      import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

      const supabase = createClient(
        "https://hgpplvegqlvxwszlhzwc.supabase.co",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhncHBsdmVncWx2eHdzemxoendjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ3NzU2NDEsImV4cCI6MjA2MDM1MTY0MX0.yMqquc9J0EhBA7lS7c-vInK6NC00BqTt5gKjMt7jl4I"
      );

      document.getElementById("signup-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        const f = e.target;
        const email = f.email.value.trim().toLowerCase();

        const row = {
          first_name:   f.firstName.value.trim(),
          last_name:    f.lastName.value.trim(),
          email,
          phone:        f.phone.value.trim() || null,
          student_name: f.studentName.value.trim() || null,
          student_age:  f.studentAge.value,
          learning_difference: f.learningDiff.value || null,
          plan_type:    "early-adopter"
        };

        /* ── 1. Find existing row (if any) ────────────────────────── */
        const { data: existing, error: fetchErr } = await supabase
          .from("signup_data")
          .select("*")
          .eq("email", email)
          .maybeSingle();

        if (fetchErr) {
          alert("Could not check your registration. Please try again.");
          console.error(fetchErr);
          return;
        }

        let rowId;

        if (!existing) {
          /* No row yet → insert */
          const { data, error } = await supabase
            .from("signup_data")
            .insert({ ...row, signup_status: 'submitted', billing_status: 'unpaid' })
            .select()
            .single();

          if (error || !data) {
            alert("Could not save your information. Please try again.");
            console.error(error);
            return;
          }
          rowId = data.id;

        } else if (existing.billing_status === 'unpaid') {
          /* Row exists but unpaid → update */
          const { data, error } = await supabase
            .from("signup_data")
            .update(row)
            .eq("id", existing.id)
            .select()
            .single();

          if (error || !data) {
            alert("Could not update your information. Please try again.");
            console.error(error);
            return;
          }
          rowId = data.id;

        } else {
          alert("Looks like you've already secured your spot—thank you!");
          return;
        }

        /* ── 2. Open Stripe Checkout ──────────────────────────────── */
        const btn = document.querySelector("stripe-buy-button");
        btn.setAttribute("data-client-reference-id", rowId);   // pass db id to Stripe
        btn.click();
      });

      window.closeModal = function() {
        const event = new Event('closeModalEvent');
        document.dispatchEvent(event);
      };
    `;
    document.body.appendChild(script);

    // Add Stripe script
    const stripeScript = document.createElement('script');
    stripeScript.src = 'https://js.stripe.com/v3/buy-button.js';
    stripeScript.async = true;
    document.head.appendChild(stripeScript);

    // Add event listener for closeModal event
    const handleCloseModal = () => {
      closeModal();
    };
    document.addEventListener('closeModalEvent', handleCloseModal);

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(stripeScript);
      document.removeEventListener('closeModalEvent', handleCloseModal);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className={`sm:max-w-md md:max-w-xl ${isMobile ? 'h-[calc(100vh-4rem)] max-h-full mt-16 pt-6' : ''}`}>
          <div className={isMobile ? 'overflow-y-auto max-h-[calc(100vh-12rem)] pb-4' : ''}>
            <form id="signup-form" style={{ maxWidth: "560px" }}>
              <h2 className="text-2xl font-medium mb-2">Reserve Your Spot for $1</h2>
              <p className="text-gray-600 mb-4">
                Join our founding community of 200 families. Complete the form below to secure your place.
              </p>

              {/* First / Last */}
              <div className="flex gap-3 mb-3">
                <input 
                  name="firstName" 
                  placeholder="Your first name" 
                  required 
                  className="flex-1 px-3 py-2 border rounded"
                />
                <input 
                  name="lastName" 
                  placeholder="Your last name" 
                  required 
                  className="flex-1 px-3 py-2 border rounded"
                />
              </div>

              {/* Email / Phone */}
              <div className="flex gap-3 mb-3">
                <input 
                  name="email" 
                  type="email" 
                  placeholder="you@example.com" 
                  required 
                  className="flex-1 px-3 py-2 border rounded"
                />
                <input 
                  name="phone" 
                  type="tel" 
                  placeholder="(555) 123-4567" 
                  className="flex-1 px-3 py-2 border rounded"
                />
              </div>

              {/* Student name / age */}
              <div className="flex gap-3 mb-3">
                <input 
                  name="studentName" 
                  placeholder="Student's name" 
                  className="flex-1 px-3 py-2 border rounded"
                />
                <select 
                  name="studentAge" 
                  required 
                  className="flex-1 px-3 py-2 border rounded"
                >
                  <option value="" disabled selected>Select age</option>
                  <option>8</option><option>9</option><option>10</option>
                  <option>11</option><option>12</option><option>13</option>
                  <option>14</option><option>15</option><option>16</option>
                </select>
              </div>

              {/* Learning difference */}
              <select 
                name="learningDiff" 
                className="w-full mb-4 px-3 py-2 border rounded"
              >
                <option value="" selected>Select if applicable</option>
                <option>ADHD</option><option>Dyslexia</option><option>Dyscalculia</option>
                <option>Executive_Functioning</option><option>Autism</option>
              </select>

              {/* Buttons */}
              <div className="flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => window.closeModal()} 
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>
                <button 
                  id="reserve-btn" 
                  type="submit"
                  className="bg-tobey-orange text-white px-4 py-2 rounded border-none"
                >
                  Reserve Your Spot for $1
                </button>
              </div>
            </form>
          </div>

          {/* Hidden Stripe Buy Button */}
          <div style={{ display: 'none' }}>
            <stripe-buy-button
              buy-button-id="buy_btn_1RROv2BpB9LJmKwiJTDSTCPl"
              publishable-key="pk_live_51R96NFBpB9LJmKwiof8LfkfsDcBtzx8sl21tqETJoiiuMSNh0yGHOuZscRLgo8NykCYscFtFGZ3Ghh29hR3Emo0W00vAw5C1Nu"
            ></stripe-buy-button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SignupTestv2;
