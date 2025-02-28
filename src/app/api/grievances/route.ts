import { NextResponse } from 'next/server';

// Your backend API URL - adjust this to your actual backend endpoint
const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://your-backend-api.com/api';

export async function POST(req: Request) {
  try {
    // Get form data from request
    const body = await req.json();
    
    // Format data for your external backend API
    const grievanceData = {
      phonenumber: body.phoneNumber,
      firstname: body.firstName,
      lastname: body.lastName,
      latitude: body.latitude,
      longitude: body.longitude,
      city: body.city || '',
      area: body.area || '',
      landmark: body.landmark || '',
      pincode: parseInt(body.pincode, 10) || 0,
      work_desc: body.workDesc,
      // The backend will handle: created_date, status, etc.
    };
    
    // Forward the request to your external backend
    const response = await fetch(`${BACKEND_API_URL}/grievances`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Include any auth headers if needed
        // 'Authorization': `Bearer ${process.env.API_TOKEN}`
      },
      body: JSON.stringify(grievanceData),
    });
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.message || 'Backend API request failed');
    }
    
    const result = await response.json();
    
    return NextResponse.json({ 
      message: 'Grievance submitted successfully',
      grievanceId: result.grievance_id || result.id
    }, { status: 201 });
  } catch (error) {
    console.error('Error submitting grievance to backend:', error);
    return NextResponse.json({ 
      error: 'Failed to submit grievance' 
    }, { status: 500 });
  }
}
