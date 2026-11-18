"""B14: Uber vs DoorDash driver, GST/HST. Example: Manitoba, 2026, GST 5% (fares include tax).
CRA (taxi-ride-sharing-drivers page, 2026-08-31): commercial ride-sharing drivers must register for GST/HST even if
they are small suppliers; tax is usually already included in the fares; ITCs allowed on GST paid on gas, repairs,
maintenance, washes, vehicle leases/purchases; no ITCs on insurance or interest.
CRA (Memo 2-2, small suppliers): the $30,000 threshold does not apply to ride-sharing; a delivery-only driver
generally registers once taxable sales pass $30,000 in four consecutive calendar quarters.
Amounts ($20,000 fares, $4,200 gas+repairs for the rides incl. GST) are an example, not CRA figures."""
import json, os
RATE = 0.05
FARES = 20_000           # ride-sharing fares, GST included
COSTS = 4_200            # gas + repairs for the rides, GST included
gst_in_fares = round(FARES * RATE / (1 + RATE), 2)
itc = round(COSTS * RATE / (1 + RATE), 2)
out = dict(fares=FARES, gst_in_fares=gst_in_fares, costs=COSTS, itc=itc, net_remit=round(gst_in_fares - itc, 2),
           delivery_same_sales_gst=0, delivery_threshold=30_000)
print(json.dumps(out, indent=1))
json.dump(out, open(os.path.join(os.path.dirname(os.path.abspath(__file__)), "data.json"), "w"), indent=1)
