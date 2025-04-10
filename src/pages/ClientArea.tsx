import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { FileText, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Profile {
  first_name: string;
  last_name: string;
  current_diploma: string;
  academic_goals: string;
}

interface Application {
  id: string;
  status: string;
  payment_completed: boolean;
  documents_submitted: boolean;
  team_review: boolean;
  school_submission: boolean;
  admission_received: boolean;
}

interface Message {
  id: string;
  content: string;
  is_from_admin: boolean;
  created_at: string;
}

function ClientArea() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [application, setApplication] = useState<Application | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
    fetchProfile();
    fetchApplication();
    fetchMessages();
  }, []);

  const checkUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/connexion');
    }
  };

  const fetchProfile = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchApplication = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('applications')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      setApplication(data);
    } catch (error) {
      console.error('Error fetching application:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true });

      if (error) throw error;
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { error } = await supabase
        .from('messages')
        .insert({
          user_id: user.id,
          content: newMessage,
          is_from_admin: false
        });

      if (error) throw error;

      setNewMessage('');
      fetchMessages();
      toast.success('Message envoyé');
    } catch (error) {
      toast.error('Erreur lors de l\u0027envoi du message');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-800 mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Profile Section */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Mon Profil</h2>
          {profile && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Nom complet</p>
                <p className="font-medium">{profile.first_name} {profile.last_name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Diplôme actuel</p>
                <p className="font-medium">{profile.current_diploma}</p>
              </div>
              <div className="col-span-2">
                <p className="text-sm text-gray-500">Objectifs académiques</p>
                <p className="font-medium">{profile.academic_goals}</p>
              </div>
            </div>
          )}
        </div>

        {/* Application Status */}
        {application ? (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">État de mon dossier</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                {application.payment_completed ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                )}
                <span>Paiement des frais (29,99 €)</span>
              </div>
              <div className="flex items-center">
                {application.documents_submitted ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                )}
                <span>Soumission des documents</span>
              </div>
              <div className="flex items-center">
                {application.team_review ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                )}
                <span>Examen du dossier</span>
              </div>
              <div className="flex items-center">
                {application.school_submission ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                )}
                <span>Soumission aux écoles</span>
              </div>
              <div className="flex items-center">
                {application.admission_received ? (
                  <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-500 mr-2" />
                )}
                <span>Admission reçue</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="text-center">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">Aucun dossier en cours</h3>
              <p className="mt-1 text-sm text-gray-500">
                Commencez votre processus d\u0027admission en prenant rendez-vous avec notre équipe.
              </p>
            </div>
          </div>
        )}

        {/* Messages Section */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
          <div className="space-y-4 mb-4 max-h-96 overflow-y-auto">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`p-4 rounded-lg ${
                  message.is_from_admin
                    ? 'bg-red-50 ml-8'
                    : 'bg-gray-50 mr-8'
                }`}
              >
                <p className="text-sm text-gray-900">{message.content}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {new Date(message.created_at).toLocaleString('fr-FR')}
                </p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex gap-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Écrivez votre message..."
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-red-800 focus:ring-red-800"
            />
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-800 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-800"
            >
              <MessageSquare className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ClientArea;